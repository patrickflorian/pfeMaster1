const models = require('../models');

exports.home = function (req, res, next) {
    res.render('home', { title: 'Express', user: req.user });
}

exports.submit_document = function (req, res, next) {
    console.log(req.body)
    return models.Document.create({...req.body}, {
        include: [ models.User ]
      }).then(document => {
        res.json(document);
        /* res.render('document/documents', {title: 'Express', documents: documents}); */
    })
}

exports.show_documents = function (req, res, next) {
    models.Document.findAll().then(documents => {
        res.json(documents);
        /* res.render('document/documents', {title: 'Express', documents: documents}); */
    })
}

exports.show_document = function (req, res, next) {
    return models.Document.findOne({
        where: {
            id: req.params.document_id
        }
    }).then(document => {
        res.json(document);
        // res.render('document/document', {document: document});
    })
}

exports.show_edit_document = function (req, res, next) {
    return models.Document.findOne({
        where: {
            id: req.params.document_id
        }
    }).then(document => {
        res.json(document);
        // res.render('document/edit_document', {document: document});
    })
}

exports.edit_document = function (req, res, next) {
    req.params.document_id
    req.body.classroom
    req.body.description
    req.body.longitude
    req.body.latitude

    return models.Document.update({
        type: req.body.type,
        title: req.body.title,
        projet: req.body.projet,
        dateAjout: req.body.dateAjout,
        fileUrl: req.body.fileUrl,
    }, {
        where: {
            id: req.params.document_id
        }
    }).then(result => {
        if (result == 1) {
            models.Document.findOne({ where: { id: req.params.document_id } }).then((user) => {
                console.log(user)
                res.json(user);
            });

        } else res.status(304);
    });
}

exports.delete_document = function (req, res, next) {
    return models.Document.destroy({
        where: {
            id: req.params.document_id
        }
    }).then(result => {
        res.redirect('/api/documents');
    })
}

exports.delete_document_json = function (req, res, next) {
    return models.Document.destroy({
        where: {
            id: req.params.document_id
        }
    }).then(result => {
        res.send({ msg: "Success" });
    })
}