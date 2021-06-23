import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Character {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  episodes: string[];

  @Prop()
  planet?: string;
}

export type CharacterDocument = Character & Document;
export const CharacterSchema = SchemaFactory.createForClass(Character);
