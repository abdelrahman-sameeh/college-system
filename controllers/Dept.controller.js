const DeptModel = require("../models/Dept.model");
const validationResult = require("express-validator").validationResult;

exports.getDept = (req, res, next) => {
    DeptModel
        .getItems()
        .then(items => {
            res.render("departments", {
                items: items,
                name:req.session.name,
                type:req.session.type,
                accademic:req.session.accademic,
                pageTitle:"Departments | FCI",
                validationErrs: req.flash("validationErrs"),
                deptAddErr: req.flash("deptAddErr")[0],
                image: req.session.image
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getDepartments = (req, res, next) => {
    DeptModel
        .getItems()
        .then(items => {
            res.render("getDepartments", {
                items: items,
                validationError: req.flash("validationErrors")[0],
                name:req.session.name,
                type:req.session.type,
                accademic:req.session.accademic,
                pageTitle:"Departments | FCI",
                deptAddedSuccessfully: req.flash('deptAddedSuccessfully')[0],
                deleteDept: req.flash('deleteDept')[0],
                image: req.session.image
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDeptToSub = (req, res, next) => {
    DeptModel
        .getItems()
        .then(items => {
            res.render("materials", {
                items: items,
                name:req.session.name,
                type:req.session.type,
                pageTitle:"Add-Subjects | FCI",
                validationErrs: req.flash('validationErrs'),
                postSubErr: req.flash('postSubErr')[0],
                accademic:req.session.accademic,
                image: req.session.image
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDept = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        DeptModel
            .addNewItem({
                deptName: req.body.deptName,
                deptCode: req.body.deptCode,
            })
            .then(() => {
                req.flash('deptAddedSuccessfully', 'تم اضافه قسم جديد ')
                res.redirect("/getDepartments");
            })
            .catch(err => {
                req.flash('deptAddErr', err);
                res.redirect('/departments')
            });
    } else {
        req.flash("validationErrs", validationResult(req).array());
        res.redirect("/departments");
    }
};




exports.postDelete = (req, res, next) => {
    DeptModel
        .deleteItem(req.body.deptName)
        .then(() => {
            req.flash('deleteDept', 'تم حذف القسم بنجاح')
            res.redirect("/getDepartments")
        })
        .catch(err => {
            console.log(err);
            req.flash('deleteDept', 'خطأ فى حذف القسم')
            res.redirect("/getDepartments")
        })
};