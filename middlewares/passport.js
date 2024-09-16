const passport = require("passport");
const db = require("../db/queries");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const localPassportStrategy = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.searchForUser(username);

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
};

localPassportStrategy();
