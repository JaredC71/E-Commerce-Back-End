const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
    
  }
  
  
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
    
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
    
  } catch (err) {
    res.status(500).json(err);
    
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
      
    });
    res.json(updateTag);
    
  } catch (err) {
    res.status(500).json(err);
    
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  ProductTag.destroy({
    where: {
      tag_id: req.params.id
    }
  });
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
    res.json(tag);
  }).catch((err) => res.status(500).json(err));
  
  
  
  
  
});

module.exports = router;