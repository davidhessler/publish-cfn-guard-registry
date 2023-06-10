import * as semver from 'semver'
import fs from 'fs'

export class InputValidator {
  private readonly genericValidString: RegExp
  private readonly s3BucketValidString: RegExp
  private readonly emailValidString: RegExp
  private readonly linuxValidString: RegExp
  constructor() {
    this.genericValidString = new RegExp('(\\w|\\s|[-.!@#$%^&*()])+')
    this.s3BucketValidString = new RegExp(
      '(?!(^xn--|.+-s3alias$|.+--ol-s3$))^[a-z0-9][a-z0-9-.]{1,61}[a-z0-9]$'
    )
    this.emailValidString = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
    this.linuxValidString = new RegExp('^\\/*.\\w+.(\\/[\\w-]+)*$')
  }

  isValidBucketName(input: string): boolean {
    return this.s3BucketValidString.test(input)
  }

  isValidGenericInput(input: string): boolean {
    return this.genericValidString.test(input)
  }

  isValidVersion(input: string): boolean {
    return semver.valid(input) !== null
  }

  isValidEmail(input: string): boolean {
    return this.emailValidString.test(input)
  }

  isValidBoolean(input: string): boolean {
    switch (input) {
      case 'true':
      case 'True':
      case 'false':
      case 'False':
        return true
      default:
        return false
    }
  }

  isFolderValid(input: string): boolean {
    return this.linuxValidString.test(input) && fs.existsSync(input)
  }
}
