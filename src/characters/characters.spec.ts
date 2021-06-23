import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './character.schema';

class CharacterMockModel {
  save = jest.fn(() => this);
  find = jest.fn();
  findAll = jest.fn();
}

describe('characters', () => {
  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        CharactersService,
        {
          provide: getModelToken(Character.name),
          useValue: CharacterMockModel,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
  });

  it('should controller and service be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a character', async () => {
    const createdCharacter = await controller.create(new CreateCharacterDto());
    expect(createdCharacter.save).toHaveBeenCalled();
  });
});
