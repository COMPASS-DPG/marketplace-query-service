import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/ban-types
export function IsSwaggerEnum(enumObject: Record<string, string>): Function {
  return (target: any, propertyKey: string) => {
    const values = Object.values(enumObject);
    ApiProperty({
      type: enumObject,
      enum: values,
      example: values.join(' || '), // Set an example enum value for documentation purposes
    })(target, propertyKey);
  };
}
