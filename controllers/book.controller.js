const { PrismaClient } = require('@prisma/client');

// Prisma client for serverless - use global to avoid connection issues
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
      include: { user: true },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      },
      include: { user: true },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, category } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        author,
        category,
        userId: req.user.id,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category } = req.body;

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      },
    });

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        category,
      },
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      },
    });

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};