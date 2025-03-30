import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
        break;

      case "POST":
        const { title, actors, releaseYear } = req.body;
        const newMovie = await prisma.movie.create({
          data: {
            title,
            actors,
            releaseYear: parseInt(releaseYear),
          },
        });
        res.status(201).json(newMovie);
        break;

      case "PUT":
        const { id, ...updateData } = req.body;
        const updatedMovie = await prisma.movie.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedMovie);
        break;

      case "DELETE":
        const { deleteId } = req.body;
        await prisma.movie.delete({
          where: { id: deleteId },
        });
        res.status(200).json({ message: "Movie deleted" });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
