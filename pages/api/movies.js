import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const movies = await prisma.movie.findMany();
        return res.status(200).json(movies);

      case "POST":
        const { title, actors, releaseYear } = req.body;

        console.log("📥 POST Request:", { title, actors, releaseYear });

        if (!title || !actors || !releaseYear) {
          return res.status(400).json({ error: "Missing fields" });
        }

        const newMovie = await prisma.movie.create({
          data: {
            title,
            actors,
            releaseYear: parseInt(releaseYear),
          },
        });

        return res.status(201).json(newMovie);

      case "PUT":
        const { id, ...updateData } = req.body;

        const updatedMovie = await prisma.movie.update({
          where: { id },
          data: updateData,
        });

        return res.status(200).json(updatedMovie);

      case "DELETE":
        const { deleteId } = req.body;

        await prisma.movie.delete({
          where: { id: deleteId },
        });

        return res.status(200).json({ message: "Movie deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
