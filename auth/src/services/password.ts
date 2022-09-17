import {scrypt, randomBytes} from 'node:crypto';
import {promisify} from 'node:util';

const scryptAsync = promisify(scrypt);

// we can name this class PasswordManager too
export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex'); // this is gonna generate a random string

        // do the actual password hashing process.
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; // the hash of the password that user sent to us to validate it
        return buf.toString('hex') === hashedPassword;
    }
}