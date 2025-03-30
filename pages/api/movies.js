import prisma from "@/lib/prisma";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      const movies = await prisma.movie.findMany();
      return res.status(200).json(movies);
    }

    if (method === "POST") {
      const { title, actors, releaseYear } = req.body;

      if (!title || !actors || !releaseYear) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newMovie = await prisma.movie.create({
        data: {
          title,
          actors,
          releaseYear: parseInt(releaseYear),
        },
      });

      return res.status(201).json(newMovie);
    }

    if (method === "PUT") {
      const { id, ...updateData } = req.body;

      const updated = await prisma.movie.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json(updated);
    }

    if (method === "DELETE") {
      const { deleteId } = req.body;

      await prisma.movie.delete({
        where: { id: deleteId },
      });

      return res.status(200).json({ message: "Deleted" });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error("🔥 API ERROR:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
}
