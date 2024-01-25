const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
    // Extrair dados do corpo da requisição (req.body)
    const {
        name,
        salary,
        approved
    } = req.body;

    if (!name) {
        res.status(422).json({
            message: 'O campo nome e obrigatorio!'
        });
        return;
    }

    const person = {
        name,
        salary,
        approved
    };

    // Criar uma pessoa no banco de dados
    try {
        await Person.create(person);
        res.status(201).json({
            message: 'Pessoa inserida com sucesso!'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({
            _id: id
        });
        
        if (!person) {
            res.status(422).json({
                message: 'Pessoa nao encontrada!'
            });
            return;
        }
        
        res.status(200).json(person);
        

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})


//Update - atualização de dodos (PUT, PATCH)

router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({
            _id: id
        }, person);

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({
                message: 'Pessoa nao encontrada!'
            });
            return;
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
})

//Delete - deletar dado
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id;

    const person = await Person.findOne ({_id: id});

    if (!person) {
        res.status(422).json({
            message: 'Pessoa nao encontrada!'
        });
        return;
    }

    try{
        await Person.deleteOne({_id: id});

        res.status(200).json({message: 'Pessoa deletada com sucesso!'});
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


})


module.exports = router;