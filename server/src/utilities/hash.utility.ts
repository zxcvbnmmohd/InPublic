import bcrypt from 'bcryptjs'

export default class HashUtility {
    static hash = async (password: string, strength: number = 12): Promise<string> => {
        return await bcrypt.hash(password, strength)
    }

    static compare = async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash)
    }
}
