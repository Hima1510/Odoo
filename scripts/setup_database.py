"""
Database setup script for Skill Swap application
Run this to initialize the database with sample data
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, db
from models import User, SwapRequest, AdminNotification
from utils import hash_password
from datetime import datetime

def setup_database():
    """Initialize database with sample data"""
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✅ Database tables created")
        
        # Check if users already exist
        if User.query.first():
            print("⚠️  Database already has data, skipping sample data creation")
            return
        
        # Create sample users
        users_data = [
            {
                'name': 'John Doe',
                'email': 'john@example.com',
                'password': hash_password('password123'),
                'location': 'New York, NY',
                'skills_offered': ['Web Development', 'JavaScript', 'React'],
                'skills_wanted': ['UI Design', 'Photography'],
                'availability': 'Weekends',
                'is_public': True
            },
            {
                'name': 'Emma Wilson',
                'email': 'emma@example.com',
                'password': hash_password('password123'),
                'location': 'Amsterdam, NL',
                'skills_offered': ['Spanish', 'French', 'German'],
                'skills_wanted': ['Web Development', 'Data Science'],
                'availability': 'Evenings',
                'is_public': True
            },
            {
                'name': 'Aarav Sharma',
                'email': 'aarav@example.com',
                'password': hash_password('password123'),
                'location': 'Bangalore, IN',
                'skills_offered': ['UI Design', 'Figma', 'Adobe XD'],
                'skills_wanted': ['Python', 'Data Analysis'],
                'availability': 'Flexible',
                'is_public': True
            },
            {
                'name': 'Sarah Miller',
                'email': 'sarah@example.com',
                'password': hash_password('password123'),
                'location': 'Remote',
                'skills_offered': ['Photography', 'Photo Editing', 'Lightroom'],
                'skills_wanted': ['Python', 'Automation'],
                'availability': 'Weekends',
                'is_public': True
            }
        ]
        
        # Add users to database
        for user_data in users_data:
            user = User(**user_data)
            db.session.add(user)
        
        db.session.commit()
        print(f"✅ Created {len(users_data)} sample users")
        
        # Create sample swap requests
        swap_requests = [
            {
                'from_user': 1,
                'to_user': 2,
                'skills_offered': 'Web Development',
                'skills_wanted': 'Spanish',
                'message': 'Hi Emma! I would love to learn Spanish from you in exchange for web development lessons.',
                'status': 'Pending'
            },
            {
                'from_user': 2,
                'to_user': 3,
                'skills_offered': 'German',
                'skills_wanted': 'UI Design',
                'message': 'Hello Aarav! Interested in learning UI design from you.',
                'status': 'Accepted'
            },
            {
                'from_user': 3,
                'to_user': 4,
                'skills_offered': 'Figma',
                'skills_wanted': 'Photography',
                'message': 'Hi Sarah! Would love to swap Figma skills for photography lessons.',
                'status': 'Pending'
            }
        ]
        
        for swap_data in swap_requests:
            swap = SwapRequest(**swap_data)
            db.session.add(swap)
        
        db.session.commit()
        print(f"✅ Created {len(swap_requests)} sample swap requests")
        
        # Create sample admin notification
        notification = AdminNotification(
            title='Welcome to Skill Swap!',
            message='Welcome to our skill exchange platform. Start connecting with others and sharing your knowledge!',
            date=datetime.utcnow()
        )
        db.session.add(notification)
        db.session.commit()
        print("✅ Created sample admin notification")
        
        print("\n🎉 Database setup complete!")
        print("\nSample login credentials:")
        print("Email: john@example.com | Password: password123")
        print("Email: emma@example.com | Password: password123")
        print("Email: aarav@example.com | Password: password123")
        print("Email: sarah@example.com | Password: password123")

if __name__ == "__main__":
    setup_database()
