-- Seed script for UzChess database
-- Run this after creating the database schema

-- Insert countries
INSERT INTO countries (id, title, flag, created) VALUES
(1, 'Uzbekistan', 'uploads/icons/flag1.svg', NOW()),
(2, 'Russia', 'uploads/icons/flag2.svg', NOW()),
(3, 'United States', 'uploads/icons/flag3.svg', NOW()),
(4, 'India', 'uploads/icons/flag4.svg', NOW());

-- Insert languages
INSERT INTO languages (id, title, code, created) VALUES
(1, 'English', 'en', NOW()),
(2, 'Uzbek', 'uz', NOW()),
(3, 'Russian', 'ru', NOW());

-- Insert difficulties
INSERT INTO difficulties (id, title, icon, created) VALUES
(1, 'Beginner', 'uploads/icons/beginner.svg', NOW()),
(2, 'Intermediate', 'uploads/icons/amateur.svg', NOW()),
(3, 'Advanced', 'uploads/icons/professional.svg', NOW());

-- Insert authors
INSERT INTO authors (id, "fullName", created) VALUES
(1, 'Garry Kasparov', NOW()),
(2, 'Magnus Carlsen', NOW()),
(3, 'Anatoly Karpov', NOW()),
(4, 'Bobby Fischer', NOW()),
(5, 'Judit Polgar', NOW()),
(6, 'Vladimir Kramnik', NOW()),
(7, 'Viswanathan Anand', NOW()),
(8, 'Ding Liren', NOW());

-- Insert course categories
INSERT INTO "courseCategories" (id, title, created) VALUES
(1, 'Opening Theory', NOW()),
(2, 'Middle Game', NOW()),
(3, 'Endgame', NOW()),
(4, 'Tactics', NOW()),
(5, 'Strategy', NOW());

-- Insert book categories
INSERT INTO "bookCategories" (id, title, created) VALUES
(1, 'Chess Openings', NOW()),
(2, 'Chess Strategy', NOW()),
(3, 'Chess History', NOW()),
(4, 'Chess Biographies', NOW()),
(5, 'Chess Tactics', NOW());

-- Insert report categories
INSERT INTO "reportCategories" (id, title, "order", created) VALUES
(1, 'Inappropriate Content', 1, NOW()),
(2, 'Copyright Violation', 2, NOW()),
(3, 'Spam', 3, NOW()),
(4, 'Harassment', 4, NOW());

-- Insert terms
INSERT INTO terms (id, content, created) VALUES
(1, 'Terms and conditions for UzChess platform...', NOW());

-- Insert users
INSERT INTO users (id, role, "fullName", "profileImage", login, "loginType", password, "birthDate", "isVerified", "isActive", "isDeleted", created) VALUES
(1, 'superAdmin', 'Admin User', 'uploads/images/player1.png', 'admin@uzchess.com', 'email', '$2b$10$hashedpassword', '1990-01-01', true, true, false, NOW()),
(2, 'user', 'Alice Johnson', 'uploads/images/player2.png', 'alice@example.com', 'email', '$2b$10$hashedpassword', '1995-05-15', true, true, false, NOW()),
(3, 'user', 'Bob Smith', 'uploads/images/player3.png', 'bob@example.com', 'email', '$2b$10$hashedpassword', '1988-12-20', true, true, false, NOW()),
(4, 'user', 'Charlie Brown', 'uploads/images/player4.jpg', 'charlie@example.com', 'email', '$2b$10$hashedpassword', '1992-08-10', true, true, false, NOW()),
(5, 'user', 'Diana Prince', 'uploads/images/player1.jpg', 'diana@example.com', 'email', '$2b$10$hashedpassword', '1990-03-25', true, true, false, NOW());

-- Insert players
INSERT INTO players (id, "countryId", "fullName", image, classic, rapid, blitz, created) VALUES
(1, 1, 'Rustam Kasimdzhanov', 'uploads/images/player1.png', 2700, 2750, 2800, NOW()),
(2, 2, 'Alexander Grischuk', 'uploads/images/player2.png', 2750, 2800, 2850, NOW()),
(3, 3, 'Fabiano Caruana', 'uploads/images/player3.png', 2800, 2850, 2900, NOW()),
(4, 4, 'Pentala Harikrishna', 'uploads/images/player4.png', 2720, 2770, 2820, NOW()),
(5, 4, 'Yu Yangyi', 'uploads/images/player1.png', 2730, 2780, 2830, NOW());

-- Insert matches
INSERT INTO matches (id, "firstPlayerId", "firstPlayerResult", "secondPlayerId", "secondPlayerResult", type, moves, date, winner, created) VALUES
(1, 1, 1, 2, 0, 'classic', 45, '2023-10-01 14:00:00', 'first', NOW()),
(2, 3, 0.5, 4, 0.5, 'rapid', 30, '2023-10-02 16:00:00', 'draw', NOW()),
(3, 5, 0, 1, 1, 'blitz', 25, '2023-10-03 18:00:00', 'second', NOW()),
(4, 2, 1, 3, 0, 'classic', 50, '2023-10-04 12:00:00', 'first', NOW()),
(5, 4, 0, 5, 1, 'rapid', 35, '2023-10-05 15:00:00', 'second', NOW());

-- Insert courses
INSERT INTO courses (id, "authorId", "categoryId", "languageId", "difficultyId", title, image, price, "newPrice", "reviewsCount", rating, "sectionsCount", "lessonsCount", created) VALUES
(1, 1, 1, 1, 1, 'Introduction to Chess Openings', 'uploads/images/course1.png', 49.99, 39.99, 25, 4.5, 5, 20, NOW()),
(2, 2, 2, 1, 2, 'Mastering the Middle Game', 'uploads/images/course2.png', 79.99, NULL, 18, 4.7, 8, 35, NOW()),
(3, 3, 3, 1, 3, 'Endgame Techniques', 'uploads/images/course3.png', 59.99, 49.99, 32, 4.8, 6, 25, NOW()),
(4, 4, 4, 2, 1, 'Chess Tactics for Beginners', 'uploads/images/course4.png', 39.99, NULL, 15, 4.3, 4, 15, NOW()),
(5, 5, 5, 1, 2, 'Strategic Thinking in Chess', 'uploads/images/course1.png', 69.99, 59.99, 22, 4.6, 7, 30, NOW());

-- Insert course sections
INSERT INTO "courseSections" (id, "courseId", title, "order", date, created) VALUES
(1, 1, 'Basic Opening Principles', 1, '2023-09-01', NOW()),
(2, 1, 'King Pawn Openings', 2, '2023-09-02', NOW()),
(3, 2, 'Pawn Structures', 1, '2023-09-03', NOW()),
(4, 2, 'Piece Coordination', 2, '2023-09-04', NOW()),
(5, 3, 'Basic Endgames', 1, '2023-09-05', NOW()),
(6, 3, 'Advanced Endgame Techniques', 2, '2023-09-06', NOW());

-- Insert course lessons
INSERT INTO "courseLessons" (id, "courseId", "courseSectionId", title, content, thumbnail, video, "order", "isFree", created) VALUES
(1, 1, 1, 'What is an Opening?', 'Content about openings...', 'uploads/images/course1.png', 'uploads/videos/lesson1.mp4', 1, true, NOW()),
(2, 1, 1, 'Development Principles', 'Content about development...', 'uploads/images/course1.png', 'uploads/videos/lesson1.mp4', 2, false, NOW()),
(3, 2, 2, 'Italian Game', 'Content about Italian Game...', 'uploads/images/course1.png', 'uploads/videos/lesson1.mp4', 1, false, NOW()),
(4, 2, 3, 'Pawn Chains', 'Content about pawn chains...', 'uploads/images/course1.png', 'uploads/videos/lesson1.mp4', 1, false, NOW()),
(5, 3, 5, 'King and Pawn Endgames', 'Content about king and pawn...', 'uploads/images/course1.png', 'uploads/videos/lesson1.mp4', 1, false, NOW());

-- Insert course reviews
INSERT INTO "courseReviews" (id, "userId", "courseId", rating, comment, created) VALUES
(1, 2, 1, 5, 'Excellent course for beginners!', NOW()),
(2, 3, 1, 4, 'Very informative.', NOW()),
(3, 4, 2, 5, 'Great explanations.', NOW()),
(4, 5, 3, 4, 'Helpful for improving endgame skills.', NOW()),
(5, 2, 4, 4, 'Good tactics training.', NOW());

-- Insert course likes
INSERT INTO "courseLikes" (id, "userId", "courseId", created) VALUES
(1, 2, 1, NOW()),
(2, 3, 2, NOW()),
(3, 4, 3, NOW()),
(4, 5, 4, NOW()),
(5, 2, 5, NOW());

-- Insert course purchases
INSERT INTO "coursePurchases" (id, "userId", "courseId", "isCompleted", created) VALUES
(1, 2, 1, true, NOW()),
(2, 3, 2, false, NOW()),
(3, 4, 3, true, NOW()),
(4, 5, 4, false, NOW()),
(5, 2, 5, true, NOW());

-- Insert users lessons
INSERT INTO "usersLessons" (id, "userId", "courseLessonId", "stoppedAt", "isCompleted", created) VALUES
(1, 2, 1, NULL, true, NOW()),
(2, 2, 2, 120, false, NOW()),
(3, 3, 4, NULL, true, NOW()),
(4, 4, 5, 300, false, NOW()),
(5, 5, 3, NULL, true, NOW());

-- Insert books
INSERT INTO books (id, "authorId", "categoryId", "languageId", "difficultyId", title, image, description, price, "newPrice", rating, "reviewsCount", pages, "pubDate", created) VALUES
(1, 1, 1, 1, 1, 'My Great Predecessors', 'uploads/images/book1.png', 'A comprehensive look at chess history.', 29.99, 24.99, 4.8, 45, 500, '2003-01-01', NOW()),
(2, 2, 2, 1, 2, 'How Life Imitates Chess', 'uploads/images/book2.png', 'Strategic thinking in chess and life.', 19.99, NULL, 4.5, 30, 250, '2010-05-15', NOW()),
(3, 3, 3, 1, 3, 'Chess is My Life', 'uploads/images/book3.png', 'Autobiography of Anatoly Karpov.', 24.99, 19.99, 4.6, 25, 300, '1991-01-01', NOW()),
(4, 4, 4, 1, 1, 'Bobby Fischer Teaches Chess', 'uploads/images/book4.png', 'Classic chess instruction book.', 15.99, NULL, 4.4, 20, 200, '1966-01-01', NOW()),
(5, 5, 5, 1, 2, 'Chess Tactics for Champions', 'uploads/images/book5.png', 'Advanced tactics training.', 34.99, 29.99, 4.7, 35, 400, '2005-03-10', NOW());

-- Insert book reviews
INSERT INTO "bookReviews" (id, "userId", "bookId", rating, comment, created) VALUES
(1, 2, 1, 5, 'Incredible insights into chess history.', NOW()),
(2, 3, 2, 4, 'Interesting parallels between chess and life.', NOW()),
(3, 4, 3, 5, 'Fascinating autobiography.', NOW()),
(4, 5, 4, 4, 'Timeless classic.', NOW()),
(5, 2, 5, 5, 'Excellent tactics book.', NOW());

-- Insert book likes
INSERT INTO "bookLikes" (id, "userId", "bookId", created) VALUES
(1, 2, 1, NOW()),
(2, 3, 2, NOW()),
(3, 4, 3, NOW()),
(4, 5, 4, NOW()),
(5, 2, 5, NOW());

-- Insert news
INSERT INTO news (id, title, image, content, date, created) VALUES
(1, 'Magnus Carlsen Retains World Championship Title', 'uploads/images/news1.png', 'In a thrilling match, Magnus Carlsen defended his title against challenger Ian Nepomniachtchi.', '2023-10-10 10:00:00', NOW()),
(2, 'New Chess App Revolutionizes Online Play', 'uploads/images/news2.png', 'UzChess launches innovative features for better user experience.', '2023-10-15 14:00:00', NOW()),
(3, 'Young Talent Shines in Junior Championships', 'uploads/images/news3.png', 'Promising young players show exceptional skills in recent tournaments.', '2023-10-20 16:00:00', NOW()),
(4, 'Chess Education Gains Popularity Worldwide', 'uploads/images/news4.png', 'More schools are incorporating chess into their curricula.', '2023-10-25 12:00:00', NOW()),
(5, 'Historic Match Between AI and Human Grandmasters', 'uploads/images/news5.png', 'AI systems continue to challenge human chess players.', '2023-10-30 18:00:00', NOW()),
(6, 'Something I wrote just for fun', 'uploads/images/news6.png', 'AI systems continue to challenge human chess players.', '2024-10-30 18:00:00', NOW());

-- Insert news views
INSERT INTO "newsViews" (id, "userId", "newsId", "firstDate", "lastDate", count, created) VALUES
(1, 2, 1, '2023-10-11 10:00:00', '2023-10-11 10:00:00', 1, NOW()),
(2, 3, 1, '2023-10-12 14:00:00', '2023-10-12 14:00:00', 1, NOW()),
(3, 4, 2, '2023-10-16 15:00:00', '2023-10-16 15:00:00', 1, NOW()),
(4, 5, 3, '2023-10-21 17:00:00', '2023-10-21 17:00:00', 1, NOW()),
(5, 2, 4, '2023-10-26 13:00:00', '2023-10-26 13:00:00', 1, NOW());

-- Insert OTP codes (for testing)
INSERT INTO "otpCodes" (id, "userId", code, type, created) VALUES
(1, 2, '123456', 'register', NOW()),
(2, 3, '654321', 'passwordReset', NOW());

-- Insert reports
INSERT INTO reports (id, "userId", "categoryId", target, "targetId", description, created) VALUES
(1, 2, 1, 'course', 1, 'Inappropriate content in lesson 2.', NOW()),
(2, 3, 2, 'book', 2, 'Copyright violation suspected.', NOW());
