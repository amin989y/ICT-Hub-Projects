using System;

class CaesarCipher
{
    // Encrypt method
    public static string Encrypt(string text, int shift)
    {
        string result = "";
        foreach (char ch in text)
        {
            if (char.IsLetter(ch))
            {
                char baseChar = char.IsUpper(ch) ? 'A' : 'a';
                result += (char)(((ch - baseChar + shift) % 26) + baseChar);
            }
            else
            {
                result += ch;
            }
        }
        return result;
    }

    // Decrypt method (reverse shift)
    public static string Decrypt(string text, int shift)
    {
        return Encrypt(text, 26 - (shift % 26));
    }

    // Main method to test
    static void Main(string[] args)
    {
        Console.Write("Enter a message: ");
        string input = Console.ReadLine();
        
        Console.Write("Enter shift value: ");
        int shift = int.Parse(Console.ReadLine());

        string encrypted = Encrypt(input, shift);
        string decrypted = Decrypt(encrypted, shift);

        Console.WriteLine("\nEncrypted: " + encrypted);
        Console.WriteLine("Decrypted: " + decrypted);
    }
}