import { Model, model, Query } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import {
  Character,
  CharacterDocument,
  CharacterSchema,
} from './character.schema';
import { GetCharactersDto, MAX_LIMIT } from './dto/get-characters.dto';
import { NotFoundException } from '@nestjs/common';

describe('characters', () => {
  let controller: CharactersController;
  let service: CharactersService;
  let mockedModel: Model<CharacterDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        CharactersService,
        {
          provide: getModelToken(Character.name),
          useValue: model(Character.name, CharacterSchema, '', true),
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
    mockedModel = module.get<Model<CharacterDocument>>(
      getModelToken(Character.name),
    );
  });

  it('should controller and service be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(mockedModel).toBeDefined();
  });

  it('should create a character', async () => {
    const character = new mockedModel();
    const dto = new CharacterDto();
    const spySave = jest
      .spyOn(mockedModel.prototype, 'save')
      .mockResolvedValue(character);
    const { character: createdCharacter } = await controller.create(dto);
    expect(spySave).toHaveBeenCalledTimes(1);
    expect(createdCharacter).toEqual(character);
  });

  describe('get', () => {
    const runFetchCharactersTest = async (dto: GetCharactersDto) => {
      const query = new Query<CharacterDocument[], CharacterDocument>();
      const spyFind = jest.spyOn(mockedModel, 'find').mockReturnValue(query);
      const spySkip = jest.spyOn(query, 'skip').mockReturnValue(query);
      const spyLimit = jest.spyOn(query, 'limit').mockResolvedValue([]);
      const { characters } = await controller.get(dto);
      expect(characters).toHaveLength(0);
      expect(spyFind).toHaveBeenCalledTimes(1);
      expect(spySkip).toHaveBeenCalledTimes(1);
      expect(spySkip).toHaveBeenLastCalledWith(
        dto.offset ? parseInt(dto.offset) : 0,
      );
      expect(spyLimit).toHaveBeenCalledTimes(1);
      expect(spyLimit).toHaveBeenLastCalledWith(
        dto.limit ? parseInt(dto.limit) : MAX_LIMIT,
      );
      spyFind.mockRestore();
    };

    it('should fetch characters with default limit and offset', async () => {
      await runFetchCharactersTest(new GetCharactersDto());
    });

    it('should fetch characters with custom limit and offset', async () => {
      const dto = new GetCharactersDto();
      dto.limit = '200';
      dto.offset = '200';
      await runFetchCharactersTest(dto);
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      const id = 'id';
      const character = new mockedModel();
      const dto = new CharacterDto();
      const query = new Query<CharacterDocument, CharacterDocument>();
      const spyExec = jest.spyOn(query, 'exec').mockResolvedValue(character);
      const spyFindByIdAndUpdate = jest
        .spyOn(mockedModel, 'findByIdAndUpdate')
        .mockReturnValue(query);
      const { character: updatedCharacter } = await controller.update(id, dto);
      expect(spyExec).toHaveBeenCalledTimes(1);
      expect(spyFindByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(updatedCharacter).toEqual(character);
      spyFindByIdAndUpdate.mockRestore();
    });

    it('should throw error when character not found', async () => {
      const id = 'id';
      const dto = new CharacterDto();
      const query = new Query<CharacterDocument, CharacterDocument>();
      const spyExec = jest.spyOn(query, 'exec').mockResolvedValue(null);
      const spyFindByIdAndUpdate = jest
        .spyOn(mockedModel, 'findByIdAndUpdate')
        .mockReturnValue(query);
      try {
        await controller.update(id, dto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
      expect(spyExec).toHaveBeenCalledTimes(1);
      expect(spyFindByIdAndUpdate).toHaveBeenCalledTimes(1);
      spyFindByIdAndUpdate.mockRestore();
    });
  });

  describe('delete', () => {
    it('should delete a character', async () => {
      const id = 'id';
      const character = new mockedModel();
      const query = new Query<CharacterDocument, CharacterDocument>();
      const spyExec = jest.spyOn(query, 'exec').mockResolvedValue(character);
      const spyFindByIdAndDelete = jest
        .spyOn(mockedModel, 'findByIdAndDelete')
        .mockReturnValue(query);
      const { character: deletedCharacter } = await controller.delete(id);
      expect(spyExec).toHaveBeenCalledTimes(1);
      expect(spyFindByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(deletedCharacter).toEqual(character);
      spyFindByIdAndDelete.mockRestore();
    });

    it('should throw error when character not found', async () => {
      const id = 'id';
      const query = new Query<CharacterDocument, CharacterDocument>();
      const spyExec = jest.spyOn(query, 'exec').mockResolvedValue(null);
      const spyFindByIdAndDelete = jest
        .spyOn(mockedModel, 'findByIdAndDelete')
        .mockReturnValue(query);
      try {
        await controller.delete(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
      expect(spyExec).toHaveBeenCalledTimes(1);
      expect(spyFindByIdAndDelete).toHaveBeenCalledTimes(1);
      spyFindByIdAndDelete.mockRestore();
    });
  });
});
