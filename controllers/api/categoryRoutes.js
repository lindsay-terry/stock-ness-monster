const router = require('express').Router();
const { Category } = require('../../models');

// The `/api/categories` endpoint

// GET all categories and associated tables
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['id', 'ASC']]
    });

    const plainCategories = categories.map(category => category.toJSON());

    res.render('categories', { categories: plainCategories });
    // res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET category by id and associated tables
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    };

    const plainCategory = category.toJSON()

    res.render('categories', { category: plainCategory });
    // res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newCategory = await Category.create({
      name: req.body.name
    });

    res.status(200).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;