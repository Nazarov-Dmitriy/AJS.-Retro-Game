import {
  calcTileType
} from "../utils";

describe('calcTileType test', () => {
  test('calcTileType value border top', () => {
    expect(calcTileType(2, 8)).toBe('top');
  });
  test('calcTileType value border right', () => {
    expect(calcTileType(15, 8)).toBe('right');
  });
  test('calcTileType value border left', () => {
    expect(calcTileType(8, 8)).toBe('left');
  });
  test('calcTileType value border bottom', () => {
    expect(calcTileType(58, 8)).toBe('bottom');
  });
})
