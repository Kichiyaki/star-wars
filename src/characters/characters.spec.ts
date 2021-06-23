import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './character.schema';
import { GetCharactersDto } from './dto/get-characters.dto';

class CharacterMockRepository {
  static find = jest.fn(() => new CharacterMockRepository());
  static findAll = jest.fn(() => new CharacterMockRepository());
  save = jest.fn(() => this);
  skip = jest.fn(() => this);
  limit = jest.fn(() => this);
}

describe('characters', () => {
  let controller: CharactersController;
  let service: CharactersService;
  let model: CharacterMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        CharactersService,
        {
          provide: getModelToken(Character.name),
          useValue: CharacterMockRepository,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
    model = module.get<CharacterMockRepository>(getModelToken(Character.name));
  });

  it('should controller and service be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should create a character', async () => {
    const dto = new CreateCharacterDto();
    const createdCharacter = await controller.create(dto);
    expect(createdCharacter.save).toHaveBeenCalled();
  });

  it('should fetch characters', async () => {
    const dto = new GetCharactersDto();
    await controller.get(dto);
    expect(CharacterMockRepository.find).toHaveBeenCalled();
  });
});
