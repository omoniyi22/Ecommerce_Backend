const { Profile, profile } = require("./../models/user");
const {
  registerValidator,
  loginValidator,
  profileValidator
} = require("./../validator/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./../config/index");
const { Auth } = require("./../middlewares/Auth");
const { verifySigup } = require("./../helper/sendMail").Mail;

const ProfileController = {
  async retrieveAllUsers(req, res) {
    try {
      const allProfile = await Profile.find();
      await res.status(200).json({
        msg: "Fetched successfully",
        data: allProfile
      });
    } catch (error) {
      res.status(400).json({
        msg: error
      });
    }
  },

  async signUp(req, res) {
    const { error } = registerValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      const emailExist = await Profile.findOne({ email: req.body.email });
      if (emailExist)
        return res.status(400).json({ msg: "Email already exists" });
      else if (req.body.token)
        try {
          let verifiedData = jwt.verify(token, APP_SECRET, (err, res) => res);
          let { password, ...profile } = verifiedData;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          let start_auth = {
            ...profile,
            password: hashedPassword
          };
          let newProfile = new Profile(start_auth);
          let savedProfile = await newProfile.save();
          let { full_name } = savedProfile;
          res.json({
            msg: `Welcome ${full_name}, you have signed up succesfully`,
            data: newProfile
          });
        } catch (error) {
          res.status(401).send({
            msg: "An error occured",
            err: error
          });
        }
      else {
        try {
          verifySigup(req, res);
        } catch (error) {
          res.status(401).send({
            msg: "An error occured",
            err: error
          });
        }
      }
    }
  },

  async login(req, res) {
    const { error } = loginValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      let user = (use = await Profile.findOne({ email: req.body.email }));
      if (!user) res.status(400).json({ msg: "Email not found" });
      else {
        user = await bcrypt.compare(req.body.password, user.password);
        if (!user) return res.status(400).json({ msg: "Invalid Password" });
        try {
          let token = await Auth.generateToken(user);
          res.header("benny-token", token).json({ token });
        } catch (error) {
          res.send(400).json({ msg: "" });
        }
      }
    }
  },

  async GoogleSignin(req, res) {
    const emailExist = await Profile.findOne({ email: req.body.email });
    if (emailExist) return this.login();
    else
      try {
        let { password, ...profile } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let start_auth = {
          ...profile,
          password: hashedPassword
        };
        let newProfile = new Profile(start_auth);
        await newProfile.save();
        this.login();
      } catch (error) {
        res.status(401).send({
          msg: "An error occured",
          err: error
        });
      }
  },

  async UpdateProfile(req, res) {
    let {
      full_name,
      email,
      phone,
      gender,
      birthday,
      address,
      add_info,
      region,
      city
    } = await req.body;
    let { error } = profileValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let user_profile = await Profile.findById(req.params.id);
        user_profile.full_name = (await full_name) || user_profile.full_name;
        user_profile.email = (await email) || user_profile.email;
        user_profile.phone = (await phone) || user_profile.phone;
        user_profile.gender = (await gender) || user_profile.gender;
        user_profile.birthday = (await birthday) || user_profile.birthday;
        user_profile.address = (await address) || user_profile.address;
        user_profile.add_info = (await add_info) || user_profile.add_info;
        user_profile.region = (await region) || user_profile.region;
        user_profile.city = (await city) || user_profile.city;
        await user_profile.save();
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          err: error
        });
      }
  }
};

module.exports = ProfileController;
