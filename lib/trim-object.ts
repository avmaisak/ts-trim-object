/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObjectType } from "./objtype.enum";

/**
 * Trim 
 */
export class TrimObject {

  /** this helper checks, that string has only white spaces. */
  private static hasOnlySpaces(str: string): boolean {
    if (!str) return false;
    if (str.length === 0) return false;
    for (let index = 0; index < str.length; index++) if (str[index] !== ' ') return false;
    return true;
  }

  /**
   * Remove empty properties form object.
   */
  static trimProps(obj: any): any {

    Object.keys(obj).forEach((key) => {

      const value = obj[key];

      if (value === null || value === '') {
        delete obj[key];
        return obj;
      }

      switch (value.constructor.name) {
        case ObjectType.Object: obj[key] = this.trimProps(value as any); break;
        case ObjectType.String: {
          if (this.hasOnlySpaces(value)) delete obj[key];
          if (obj[key]) obj[key] = value.trim(); break;
        }
        case ObjectType.Array:
          const arr = value as Array<any>;
          if (!arr || arr.length === 0) delete obj[key];
          for (let index = 0; index < arr.length; index++) arr[index] = this.trimProps(arr[index]);
          break;
        default: break;
      }
    });

    return obj;
  }
}

/** Declaring Global Extension method. */
declare global {
  interface Object {
    /** Remove empty properties form object. */
    trimProps: () => any;
  }
}

/** Remove empty properties form object. */
Object.prototype.trimProps = function (): any {
  return TrimObject.trimProps(this);
}
