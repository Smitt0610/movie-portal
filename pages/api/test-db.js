import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const test = await prisma.movie.findMany({ take: 1 });
    res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error("Test DB Error:", error);
    res.status(500).json({ error: error.message });
  }
}
