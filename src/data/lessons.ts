export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const lessons: Lesson[] = [
  {
    id: 'crypto-basics',
    title: 'Cryptocurrency Basics',
    content: `
# What is Cryptocurrency?

Cryptocurrency is a digital or virtual form of money that uses cryptography for security. Unlike traditional currencies issued by governments, cryptocurrencies are typically decentralized systems based on blockchain technology.

## Key Points:
- Cryptocurrencies are digital assets
- They use blockchain technology
- They're decentralized (not controlled by any single entity)
- Transactions are secure and transparent
    `,
    quiz: {
      id: 'crypto-basics-quiz',
      questions: [
        {
          id: 'q1',
          text: 'What is cryptocurrency?',
          options: [
            'Physical money issued by banks',
            'Digital or virtual currency using cryptography',
            'Stock market shares',
            'Government bonds'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          text: 'What technology do cryptocurrencies typically use?',
          options: [
            'Cloud computing',
            'Artificial Intelligence',
            'Blockchain',
            'Virtual Reality'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          text: 'What does "decentralized" mean in cryptocurrency?',
          options: [
            'It\'s controlled by a central bank',
            'It\'s only used in certain countries',
            'It\'s not controlled by any single entity',
            'It\'s only available online'
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 'blockchain-101',
    title: 'Understanding Blockchain',
    content: `
# What is Blockchain?

Blockchain is a distributed database or ledger that is shared among computer network nodes. It stores information electronically in a digital format, guaranteeing the fidelity and security of data records.

## Key Points:
- Blockchain is like a digital ledger
- It's distributed across many computers
- Once recorded, data can't be changed easily
- It's transparent and secure
    `,
    quiz: {
      id: 'blockchain-101-quiz',
      questions: [
        {
          id: 'q1',
          text: 'What is blockchain?',
          options: [
            'A type of cryptocurrency',
            'A distributed digital ledger',
            'A computer program',
            'A banking system'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          text: 'What happens to data once it\'s recorded on the blockchain?',
          options: [
            'It can be easily changed',
            'It gets deleted after 24 hours',
            'It\'s difficult to change or tamper with',
            'It becomes private'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          text: 'How is blockchain data stored?',
          options: [
            'In a single central computer',
            'On paper records',
            'Across a network of computers',
            'In a bank\'s database'
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 'wallet-security',
    title: 'Wallet Security Best Practices',
    content: `
# Keeping Your Crypto Wallet Secure

A cryptocurrency wallet is your gateway to the blockchain. Keeping it secure is crucial for protecting your digital assets.

## Key Points:
- Never share your private keys
- Use strong passwords
- Enable two-factor authentication
- Keep backup of recovery phrases
    `,
    quiz: {
      id: 'wallet-security-quiz',
      questions: [
        {
          id: 'q1',
          text: 'What should you never share with anyone?',
          options: [
            'Your wallet address',
            'Your private keys',
            'Your transaction history',
            'Your public key'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          text: 'What is two-factor authentication?',
          options: [
            'Using two different wallets',
            'Having two passwords',
            'An extra layer of security beyond password',
            'Double checking transactions'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          text: 'Why are recovery phrases important?',
          options: [
            'They\'re not important',
            'They look cool',
            'They help recover access to your wallet if needed',
            'They speed up transactions'
          ],
          correctAnswer: 2
        }
      ]
    }
  }
];
