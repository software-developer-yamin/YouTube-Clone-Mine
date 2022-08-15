import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import argon2 from "argon2";
import logger from "../../utils/logger";

@pre<User>("save", async function (next) {
  try {
    if (!this.isModified("password") || !this.isNew) return next();
    const hashPassword = await argon2.hash(this.password as string);
    this.password = hashPassword;
    return next();
  } catch (err: any) {
    logger.error(err);
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username?: string;
  @prop({ required: true, unique: true })
  public email?: string;
  @prop({ required: true })
  public password?: string;

  public async comparePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password as string, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
