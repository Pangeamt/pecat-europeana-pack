import { createGzip } from "zlib";
import fs from "fs";
import { oxygenBuildFile } from "../../../lib/utils";
import path from "path";
import { pipeline } from "stream";
import prisma from "../../../lib/prisma";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);
const unlinkAsync = promisify(fs.unlink);

function combineAndRemove(array) {
  const combined = {};

  array.forEach((obj) => {
    if (obj.belongTo) {
      if (combined[obj.belongTo]) {
        combined[obj.belongTo].srcLiteral += " " + obj.srcLiteral;
        combined[obj.belongTo].translatedLiteral += " " + obj.translatedLiteral;
      } else {
        const aux = {
          ...obj,
          id: obj.belongTo,
          srcLiteral: obj.srcLiteral,
          translatedLiteral: obj.translatedLiteral,
          translationScorePercent: null,
        };
        combined[obj.belongTo] = {
          ...aux,
        };
      }
    }
  });

  const filtered = array.filter((obj) => !obj.belongTo);

  for (let key in combined) {
    delete combined[key].belongTo;
    filtered.push(combined[key]);
  }

  return filtered;
}

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const uuid = searchParams.get("uuid");
    const projectId = searchParams.get("projectId");

    const project = await prisma.project.findUnique({
      where: {
        uuid: uuid ?? undefined,
        id: projectId ?? undefined,
      },
    });

    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }

    const accessDeadline = new Date(project.accessDeadline);
    const now = new Date();
    if (accessDeadline < now) {
      return new Response(JSON.stringify({ message: "The link has expired" }), {
        status: 401,
      });
    }

    const tus = await prisma.tu.findMany({
      where: {
        projectId: project.id ?? undefined,
      },
    });

    const tusCombined = combineAndRemove(tus);

    if (project.extension === "json") {
      const jsonString = JSON.stringify(tusCombined);

      const fileNameAux = project.filename.split(".json")[0];
      const aux = new Date().getTime();
      const jsonFilePath = path.resolve(
        `./public/files/downloads/${fileNameAux}-${aux}-pecat.json`
      );
      const gzFilePath = path.resolve(
        `./public/files/downloads/${fileNameAux}-${aux}-pecat.json.gz`
      );

      await fs.promises.writeFile(jsonFilePath, jsonString);

      await pipelineAsync(
        fs.createReadStream(jsonFilePath),
        createGzip(),
        fs.createWriteStream(gzFilePath)
      );

      const fileBuffer = await fs.promises.readFile(gzFilePath);

      // Programar la eliminación del archivo después de un breve retraso para asegurar que la respuesta se haya enviado
      setTimeout(async () => {
        try {
          await unlinkAsync(jsonFilePath);
          await unlinkAsync(gzFilePath);
        } catch (err) {
          console.error("Error deleting temporary files:", err);
        }
      }, 5000); // 5 segundos de retraso

      return new Response(fileBuffer, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename=${fileNameAux}-pecat.json.gz`,
        },
      });
    } else {
      const tgts = tusCombined.map((tu) =>
        tu.reviewLiteral ? tu.reviewLiteral : tu.translatedLiteral || ""
      );
      const data = await oxygenBuildFile({
        tgts,
        src_lang: project.sourceLanguage,
        tgt_lang: project.targetLanguage,
        filePath: project.filePath,
      });

      return new Response(Buffer.from(data), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename=${project.filename}`,
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    return Response.json({
      texts: segmentedTexts,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
