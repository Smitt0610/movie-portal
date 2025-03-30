import prisma from '@/lib/prisma'; // use "../../lib/prisma" if alias doesn't work

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
          releaseYear: parseInt(releaseYear)
        },
      });

      return res.status(201).json(movie);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
