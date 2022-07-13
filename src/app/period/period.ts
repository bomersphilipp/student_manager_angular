/**
 * Period entity
 */
export class Period {
  // ID is optional for creating new periods
  id?: number;
  begin!: Date;
  end!: Date;
}
