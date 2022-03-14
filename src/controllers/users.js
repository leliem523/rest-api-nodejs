const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const resultFindAll = await userModel.findAll();
    if (resultFindAll) {
      res.status(200).json({
        status: true,
        message: "get all user successful !!",
        data: listUser,
      });
    }
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.userId;
  userModel.findByPk(userId).then((user) => {
    if (!user) {
      res.status(201).json({
        status: false,
        message: "Khong tim thay !!",
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Da tim thay !!",
        user,
      });
    }
  });
};

exports.createUser = (req, res, next) => {
  const { email, fullname, phone, age, gender, password } = req.body;

  userModel
    .findOne({
      where: { email: email },
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          status: false,
          message: "Email da ton tai !!",
        });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new userModel({
        email: email,
        fullname: fullname,
        phone: phone,
        age: age,
        gender: gender,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      return res.status(201).json({
        status: true,
        message: "Them user thanh cong !!",
        user,
      });
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

exports.delUserById = (req, res, next) => {
  const userId = req.params.userId;
  userModel.findByPk(userId).then((user) => {
    if (!user) {
      res.status(201).json({
        status: false,
        message: "Khong tim thay !!",
      });
    } else {
      userModel
        .destroy({
          where: { email: userId },
        })
        .then(() => {
          res.status(201).json({
            status: true,
            message: "Xoa thanh cong !!",
          });
        });
    }
  });
};

exports.checkLogin = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          status: false,
          message: "email va password khong ton tai !!",
        });
      }
      return Promise.all([bcrypt.compare(password, user.password), user]);
    })
    .then((result) => {
      const isMatch = result[0];
      const user = result[1];
      if (!isMatch) {
        return res.status(200).json({
          status: false,
          message: "Password khong dung !!",
        });
      }
      const payload = {
        email: user.email,
      };
      return jwt.sign(payload, "liemTest", { expiresIn: 3 });
    })
    .then((token) => {
      res.status(200).json({
        status: true,
        message: "Dang nhap thanh cong !!",
        token,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { email, fullname, phone, age, gender, password } = req.body;

  userModel
    .findOne({
      where: { email: email },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Email khong ton tai !!",
        });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new Object({
        email: email,
        fullname: fullname,
        phone: phone,
        age: age,
        gender: gender,
        password: hashedPassword,
      });
      return userModel.update(user, { where: { email: user.email } });
    })
    .then((num) => {
      if (num == 1) {
        res.status(201).json({
          status: true,
          message: "Cap nhat thanh cong !!",
          user: num,
        });
      } else {
        res.status(201).json({
          status: false,
          message: "Cap nhat khong thanh cong !!",
          user: num,
        });
      }
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};
