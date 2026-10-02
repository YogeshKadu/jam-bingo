// utility functions.

export function GetRandomBoard(length, disabled) {
  const numbers = Array.from({ length }, (_, i) => i + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers.map((number) => ({
    id: number,
    value: number,
    label: number,
    disabled: disabled,
    highlighted: false,
  }));
}

export function CalculateScore(board) {
  const size = Math.sqrt(board.length);

  if (!Number.isInteger(size)) {
    throw new Error("Board must be a square array");
  }

  let completedLines = 0;

  // Check rows
  for (let row = 0; row < size; row++) {
    const isComplete = board
      .slice(row * size, row * size + size)
      .every((cell) => cell.highlighted);

    if (isComplete) completedLines++;
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    const isComplete = Array.from(
      { length: size },
      (_, row) => board[row * size + col],
    ).every((cell) => cell.highlighted);

    if (isComplete) completedLines++;
  }

  // Check top-left → bottom-right diagonal
  if (
    Array.from({ length: size }, (_, i) => board[i * size + i]).every(
      (cell) => cell.highlighted,
    )
  ) {
    completedLines++;
  }

  // Check top-right → bottom-left diagonal
  if (
    Array.from(
      { length: size },
      (_, i) => board[i * size + (size - 1 - i)],
    ).every((cell) => cell.highlighted)
  ) {
    completedLines++;
  }

  return Math.min(completedLines * 20, 100);
}

export function RotateBoard(board, rings = 1) {
  const size = Math.sqrt(board.length);

  if (!Number.isInteger(size)) {
    throw new Error("Board must be a square array");
  }

  const result = [...board];

  for (let ring = 0; ring < rings; ring++) {
    const min = ring;
    const max = size - 1 - ring;

    if (min >= max) break;

    // Save the ring
    const positions = [];

    // Top
    for (let col = min; col <= max; col++) {
      positions.push(min * size + col);
    }

    // Right
    for (let row = min + 1; row <= max; row++) {
      positions.push(row * size + max);
    }

    // Bottom
    for (let col = max - 1; col >= min; col--) {
      positions.push(max * size + col);
    }

    // Left
    for (let row = max - 1; row > min; row--) {
      positions.push(row * size + min);
    }

    // One step clockwise
    for (let i = 0; i < positions.length; i++) {
      const current = positions[i];
      const previous = positions[(i - 1 + positions.length) % positions.length];

      result[current] = board[previous];
    }
  }

  return result;
}