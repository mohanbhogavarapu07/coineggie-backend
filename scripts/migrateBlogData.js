import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/BlogPost.js';

dotenv.config();

const blogPosts = [
  {
    title: 'The Complete Guide to Building Wealth in Your 20s: A Decade-by-Decade Strategy',
    description: 'Your twenties are a critical decade for establishing financial foundations. This comprehensive guide covers everything from emergency funds to investment strategies, helping you make the most of compound interest and time.',
    content: `
      <h2>The Foundation of Financial Success</h2>
      <p>Your twenties are a critical period for establishing financial foundations. This comprehensive guide will help you navigate the complex world of personal finance and set yourself up for long-term success.</p>

      <h2>Emergency Fund: Your Financial Safety Net</h2>
      <p>The first step in building wealth is creating an emergency fund. Aim to save 3-6 months of living expenses in a high-yield savings account. This fund will protect you from unexpected expenses and provide peace of mind.</p>

      <h2>Investment Strategies for Young Professionals</h2>
      <p>Start investing early to take advantage of compound interest. Consider a mix of:</p>
      <ul>
        <li>Index funds for broad market exposure</li>
        <li>ETFs for specific sector investments</li>
        <li>Retirement accounts (401k, IRA) for tax advantages</li>
      </ul>

      <h2>Debt Management</h2>
      <p>Prioritize paying off high-interest debt while making minimum payments on low-interest loans. Consider debt consolidation or refinancing options to reduce interest rates.</p>

      <h2>Building Multiple Income Streams</h2>
      <p>Diversify your income through:</p>
      <ul>
        <li>Side hustles</li>
        <li>Freelance work</li>
        <li>Passive income investments</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building wealth in your twenties requires discipline, patience, and a long-term perspective. Start early, stay consistent, and watch your wealth grow over time.</p>
    `,
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-15',
    readTime: 15,
    category: 'Personal Finance',
    author: {
      name: 'Arjun Mehta',
      avatar: 'https://i.pravatar.cc/150?img=33',
      designation: 'Senior Financial Advisor',
      bio: 'Arjun has over 10 years of experience in financial planning and has helped hundreds of young professionals build wealth systematically.'
    },
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Wealth Building', 'Young Professionals', 'Investment Strategy', 'Personal Finance'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'Indian Stock Market Analysis 2024: Sectors to Watch and Investment Opportunities',
        excerpt: 'An in-depth analysis of the Indian stock market trends for 2024.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'indian-stock-market-analysis-2024'
      },
      {
        title: 'Financial Independence and Early Retirement (FIRE) Movement in India',
        excerpt: 'Learn how to achieve financial independence and retire early in the Indian context.',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'fire-movement-india-practical-guide'
      }
    ]
  },
  {
    title: 'Indian Stock Market Analysis 2024: Sectors to Watch and Investment Opportunities',
    description: 'An in-depth analysis of the Indian stock market trends for 2024, including sector-wise performance, emerging opportunities in renewable energy, technology, and healthcare sectors.',
    content: `
      <h2>Market Overview</h2>
      <p>The Indian stock market continues to show resilience and growth potential in 2024. This analysis provides insights into key sectors and investment opportunities.</p>

      <h2>Technology Sector</h2>
      <p>The technology sector remains a strong performer, driven by:</p>
      <ul>
        <li>Digital transformation initiatives</li>
        <li>Cloud computing adoption</li>
        <li>AI and machine learning innovations</li>
      </ul>

      <h2>Renewable Energy</h2>
      <p>India's commitment to renewable energy creates opportunities in:</p>
      <ul>
        <li>Solar power infrastructure</li>
        <li>Wind energy projects</li>
        <li>Energy storage solutions</li>
      </ul>

      <h2>Healthcare and Pharmaceuticals</h2>
      <p>The healthcare sector shows strong growth potential due to:</p>
      <ul>
        <li>Increasing healthcare spending</li>
        <li>Pharmaceutical innovation</li>
        <li>Medical tourism growth</li>
      </ul>

      <h2>Investment Strategies</h2>
      <p>Consider these approaches for 2024:</p>
      <ul>
        <li>Diversification across sectors</li>
        <li>Long-term investment horizon</li>
        <li>Regular portfolio rebalancing</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The Indian market offers diverse opportunities for investors. Focus on sectors with strong fundamentals and long-term growth potential.</p>
    `,
    publishedDate: '2024-01-10',
    updatedDate: '2024-01-10',
    readTime: 20,
    category: 'Investments',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=28',
      designation: 'Market Research Analyst',
      bio: 'Priya is a CFA charterholder with 8 years of experience in equity research and portfolio management, specializing in Indian markets.'
    },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Stock Market', 'India', 'Market Analysis', 'Investment', 'Sectors'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'The Complete Guide to Building Wealth in Your 20s',
        excerpt: 'Your twenties are a critical decade for establishing financial foundations.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'wealth-building-guide-twenties'
      },
      {
        title: 'Real Estate Investment in India: A Complete Guide',
        excerpt: 'Everything you need to know about real estate investment in India.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'real-estate-investment-india-guide'
      }
    ]
  },
  {
    title: 'Real Estate Investment in India: A Complete Guide to REITs, Property Investment, and Market Trends',
    description: 'Everything you need to know about real estate investment in India, from traditional property investment to modern REITs, including tax implications and market analysis.',
    content: `
      <h2>Understanding Real Estate Investment Options</h2>
      <p>India's real estate market offers diverse investment opportunities, from traditional property investment to modern REITs.</p>

      <h2>Traditional Property Investment</h2>
      <p>Key considerations for property investment:</p>
      <ul>
        <li>Location analysis</li>
        <li>Property valuation</li>
        <li>Legal due diligence</li>
        <li>Financing options</li>
      </ul>

      <h2>REITs: A Modern Approach</h2>
      <p>Real Estate Investment Trusts offer several advantages:</p>
      <ul>
        <li>Lower capital requirement</li>
        <li>Professional management</li>
        <li>Regular income distribution</li>
        <li>Better liquidity</li>
      </ul>

      <h2>Tax Implications</h2>
      <p>Understanding tax aspects is crucial:</p>
      <ul>
        <li>Capital gains tax</li>
        <li>Rental income taxation</li>
        <li>REIT dividend taxation</li>
        <li>Tax-saving opportunities</li>
      </ul>

      <h2>Market Analysis</h2>
      <p>Current trends and future outlook:</p>
      <ul>
        <li>Residential market trends</li>
        <li>Commercial property outlook</li>
        <li>REIT market growth</li>
        <li>Emerging opportunities</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Real estate investment in India requires careful planning and market understanding. Choose the right investment vehicle based on your goals and risk appetite.</p>
    `,
    publishedDate: '2024-01-08',
    updatedDate: '2024-01-08',
    readTime: 18,
    category: 'Investments',
    author: {
      name: 'Vikram Singh',
      avatar: 'https://i.pravatar.cc/150?img=51',
      designation: 'Real Estate Investment Specialist',
      bio: 'Vikram has 12 years of experience in real estate investment and has helped numerous clients build profitable property portfolios.'
    },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Real Estate', 'REITs', 'Property Investment', 'India'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'Indian Stock Market Analysis 2024',
        excerpt: 'An in-depth analysis of the Indian stock market trends for 2024.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'indian-stock-market-analysis-2024'
      },
      {
        title: 'The Complete Guide to Building Wealth in Your 20s',
        excerpt: 'Your twenties are a critical decade for establishing financial foundations.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'wealth-building-guide-twenties'
      }
    ]
  },
  {
    title: 'Cryptocurrency in India: Legal Framework, Tax Implications, and Investment Strategies',
    description: 'Navigate the complex world of cryptocurrency investments in India with our comprehensive guide covering legal aspects, taxation, and strategic investment approaches.',
    content: `
      <h2>Understanding Cryptocurrency in India</h2>
      <p>Cryptocurrency has emerged as a significant investment asset class in India. This guide helps you navigate the complex landscape.</p>

      <h2>Legal Framework</h2>
      <p>Current regulatory status and implications:</p>
      <ul>
        <li>RBI guidelines</li>
        <li>Taxation framework</li>
        <li>Compliance requirements</li>
        <li>Future regulations</li>
      </ul>

      <h2>Tax Implications</h2>
      <p>Understanding crypto taxation:</p>
      <ul>
        <li>Capital gains tax</li>
        <li>Income tax considerations</li>
        <li>Tax reporting requirements</li>
        <li>Tax-saving strategies</li>
      </ul>

      <h2>Investment Strategies</h2>
      <p>Approaches to crypto investment:</p>
      <ul>
        <li>Portfolio allocation</li>
        <li>Risk management</li>
        <li>Diversification strategies</li>
        <li>Long-term vs short-term</li>
      </ul>

      <h2>Security Best Practices</h2>
      <p>Protecting your investments:</p>
      <ul>
        <li>Wallet security</li>
        <li>Exchange selection</li>
        <li>2FA implementation</li>
        <li>Backup strategies</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Cryptocurrency investment in India requires careful consideration of legal, tax, and security aspects. Stay informed and invest responsibly.</p>
    `,
    publishedDate: '2024-01-05',
    updatedDate: '2024-01-05',
    readTime: 16,
    category: 'Investments',
    author: {
      name: 'Rajesh Kumar',
      avatar: 'https://i.pravatar.cc/150?img=45',
      designation: 'Crypto Investment Advisor',
      bio: 'Rajesh specializes in cryptocurrency investments and has been advising clients on digital asset strategies for over 5 years.'
    },
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Cryptocurrency', 'Digital Assets', 'Tax', 'Legal'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'Indian Stock Market Analysis 2024',
        excerpt: 'An in-depth analysis of the Indian stock market trends for 2024.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'indian-stock-market-analysis-2024'
      },
      {
        title: 'Real Estate Investment in India',
        excerpt: 'Everything you need to know about real estate investment in India.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'real-estate-investment-india-guide'
      }
    ]
  },
  {
    title: 'Insurance Planning in India: Life, Health, and Motor Insurance Comprehensive Guide',
    description: 'A detailed guide to understanding and choosing the right insurance products in India, covering life insurance, health insurance, and motor insurance with claim processes.',
    content: `
      <h2>Understanding Insurance in India</h2>
      <p>Insurance is a crucial component of financial planning. This guide helps you navigate the complex world of insurance products.</p>

      <h2>Life Insurance</h2>
      <p>Types and considerations:</p>
      <ul>
        <li>Term insurance</li>
        <li>Whole life policies</li>
        <li>Endowment plans</li>
        <li>ULIPs</li>
      </ul>

      <h2>Health Insurance</h2>
      <p>Key aspects to consider:</p>
      <ul>
        <li>Coverage options</li>
        <li>Pre-existing conditions</li>
        <li>Network hospitals</li>
        <li>Claim process</li>
      </ul>

      <h2>Motor Insurance</h2>
      <p>Understanding motor insurance:</p>
      <ul>
        <li>Comprehensive vs third-party</li>
        <li>Add-on covers</li>
        <li>No-claim bonus</li>
        <li>Claim settlement</li>
      </ul>

      <h2>Insurance Planning Strategy</h2>
      <p>Building a comprehensive insurance portfolio:</p>
      <ul>
        <li>Needs assessment</li>
        <li>Product selection</li>
        <li>Premium planning</li>
        <li>Regular review</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Proper insurance planning is essential for financial security. Choose the right products based on your needs and circumstances.</p>
    `,
    publishedDate: '2024-01-03',
    updatedDate: '2024-01-03',
    readTime: 14,
    category: 'Personal Finance',
    author: {
      name: 'Neha Gupta',
      avatar: 'https://i.pravatar.cc/150?img=29',
      designation: 'Insurance Planning Expert',
      bio: 'Neha has 8 years of experience in insurance planning and has helped numerous families secure their financial future.'
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Insurance', 'Life Insurance', 'Health Insurance', 'Motor Insurance'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'The Complete Guide to Building Wealth in Your 20s',
        excerpt: 'Your twenties are a critical decade for establishing financial foundations.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'wealth-building-guide-twenties'
      },
      {
        title: 'Real Estate Investment in India',
        excerpt: 'Everything you need to know about real estate investment in India.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'real-estate-investment-india-guide'
      }
    ]
  },
  {
    title: 'Financial Independence and Early Retirement (FIRE) Movement in India: A Practical Roadmap',
    description: 'Learn how to achieve financial independence and retire early in the Indian context with practical strategies, investment planning, and lifestyle considerations.',
    content: `
      <h2>Understanding FIRE in India</h2>
      <p>The Financial Independence, Retire Early (FIRE) movement is gaining traction in India. This guide provides a practical roadmap.</p>

      <h2>Financial Planning</h2>
      <p>Key components of FIRE planning:</p>
      <ul>
        <li>Expense tracking</li>
        <li>Savings rate optimization</li>
        <li>Investment allocation</li>
        <li>Tax planning</li>
      </ul>

      <h2>Investment Strategy</h2>
      <p>Building a FIRE portfolio:</p>
      <ul>
        <li>Equity investments</li>
        <li>Real estate allocation</li>
        <li>Fixed income options</li>
        <li>Emergency fund</li>
      </ul>

      <h2>Lifestyle Considerations</h2>
      <p>Adapting to FIRE lifestyle:</p>
      <ul>
        <li>Expense reduction</li>
        <li>Side income streams</li>
        <li>Healthcare planning</li>
        <li>Family considerations</li>
      </ul>

      <h2>Common Challenges</h2>
      <p>Navigating FIRE obstacles:</p>
      <ul>
        <li>Market volatility</li>
        <li>Inflation impact</li>
        <li>Healthcare costs</li>
        <li>Family responsibilities</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Achieving FIRE in India requires careful planning, disciplined execution, and adaptability to changing circumstances.</p>
    `,
    publishedDate: '2024-01-01',
    updatedDate: '2024-01-01',
    readTime: 22,
    category: 'Personal Finance',
    author: {
      name: 'Ankit Patel',
      avatar: 'https://i.pravatar.cc/150?img=42',
      designation: 'FIRE Movement Advocate',
      bio: 'Ankit achieved financial independence at 35 and now helps others plan their path to early retirement.'
    },
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['FIRE', 'Financial Independence', 'Early Retirement', 'India'],
    isPublished: true,
    relatedPosts: [
      {
        title: 'The Complete Guide to Building Wealth in Your 20s',
        excerpt: 'Your twenties are a critical decade for establishing financial foundations.',
        imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'wealth-building-guide-twenties'
      },
      {
        title: 'Indian Stock Market Analysis 2024',
        excerpt: 'An in-depth analysis of the Indian stock market trends for 2024.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        slug: 'indian-stock-market-analysis-2024'
      }
    ]
  }
];

const migrateData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://krishnakumar:2005@cluster0.q0wsypz.mongodb.net/coineggie');
    console.log('Connected to MongoDB');

    // Clear existing blog posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert new blog posts
    const insertedPosts = await BlogPost.insertMany(blogPosts);
    console.log(`Successfully migrated ${insertedPosts.length} blog posts`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateData(); 