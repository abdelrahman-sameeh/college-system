const mongoose = require("mongoose");

const DB_URL =process.env.DB_URL;
const DeptSchema = mongoose.Schema({
    deptName: String,
    deptCode: String,
});

const DepartmentItem = mongoose.model("department", DeptSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return DepartmentItem.findOne({deptName:data.deptName})
            }).then(items =>{
                if(!items){
                    let item = new DepartmentItem(data);
                    return item.save();
                }
                else {
                    return DepartmentItem.findByIdAndUpdate(items._id,data)
                }
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItems= () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return DepartmentItem.find({});
            })
            .then(items => {
                resolve(items);
                mongoose.disconnect();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


exports.deleteItem = (name) => {
    return new Promise((resolve, reject) => {
        // reject()
        mongoose
            .connect(DB_URL)
            .then(() => DepartmentItem.findOneAndDelete({deptName:name}))
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};




