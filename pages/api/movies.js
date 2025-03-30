import prisma from "@/lib/prisma";

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

      const movie = await prisma.movie.create({
        data: {
          title,
          actors,
          releaseYear: parseInt(releaseYear),
        },
      });

      return res.status(201).json(movie);
    }

    if (method === "PUT") {
      const { id, title, actors, releaseYear } = req.body;

      const updated = await prisma.movie.update({
        where: { id },
        data: { title, actors, releaseYear: parseInt(releaseYear) },
      });

      return res.status(200).json(updated);
    }

    if (method === "DELETE") {
      const { deleteId } = req.body;

      await prisma.movie.delete({
        where: { id: deleteId },
      });

      return res.status(200).json({ message: "Deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
