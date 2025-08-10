import React, { useState, useEffect } from "react";
import Results from "./Results";
const quizData = [
  {
    question: "Chiêu 1 của Gildur có tên là gì?",
    options: ["Bàn tay vàng", "Quả đấm vàng", "Xung kích vàng", "Vụ nổ vàng"],
    answer: "Bàn tay vàng",
  },
  {
    question:
      "Chiêu 2 của Gildur có thể làm choáng tướng địch trong bao nhiêu giây?",
    options: ["1 giây", "1.2 giây", "1.5 giây", "2 giây"],
    answer: "1.2 giây",
  },
  {
    question: "Trong một trận đấu phút thứ bao nhiêu thì sẽ giảm mất giáp trụ?",
    options: ["3 phút", "6 phút", "5 phút", "4 phút"],
    answer: "4 phút",
  },
  {
    question: "Món trang bị diệt thần cung có giá là bao nhiêu vàng? ",
    options: ["3000 vàng ", "2980 vàng", "2950 vàng", "2900 vàng"],
    answer: "2980 vàng",
  },
  {
    question:
      "Bộ trang bị nào cho phép cường hóa đánh thường sau mỗi lần dùng chiêu?",
    options: [
      "Gươm hiền triết",
      "Gươm tận thế",
      "Thập tự kiếm",
      "Trượng bùng nổ",
    ],
    answer: "Gươm tận thế",
  },
  {
    question: "Vị tướng nào có hiệu ứng tung chiêu đặc biệt với Volkath",
    options: ["Aleister", "Krixi", "Tel'Annas", "Lauriel"],
    answer: "Tel'Annas",
  },
  {
    question: "Tướng nào được mệnh danh là 'Thần Rừng' trong Liên Quân Mobile?",
    options: ["Nakroth", "Murad", "Zill", "Quillen"],
    answer: "Nakroth",
  },
  {
    question: "Trang bị nào tăng tốc đánh nhiều nhất trong Liên Quân Mobile?",
    options: ["Song Đao Bão Táp", "Thánh Kiếm", "Cung Tà Ma", "Kiếm Fenrir"],
    answer: "Song Đao Bão Táp",
  },
  {
    question: "Chiêu cuối của tướng Tulen có tên là gì?",
    options: ["Lôi Điểu", "Lôi Quang", "Lôi Phạt", "Lôi Kích"],
    answer: "Lôi Điểu",
  },
  {
    question: "Bản đồ trong chế độ 5v5 của Liên Quân Mobile có tên là gì?",
    options: [
      "Thung Lũng Quên Lãng",
      "Miền Đất Hứa",
      "Đấu Trường Danh Vọng",
      "Athena's Valley",
    ],
    answer: "Đấu Trường Danh Vọng",
  },
  {
    question: "Tướng nào sở hữu chiêu 'Truy Sát'?",
    options: ["Quillen", "Zill", "Murad", "Nakroth"],
    answer: "Quillen",
  },
  {
    question: "Trang bị nào giúp hồi máu khi gây sát thương?",
    options: [
      "Kiếm Fafnir",
      "Thánh Kiếm",
      "Hercule Thịnh Nộ",
      "Liềm Đoạt Mệnh",
    ],
    answer: "Hercule Thịnh Nộ",
  },
  {
    question: "Ai là tướng có biệt danh 'Thợ Săn Tiền Thưởng'?",
    options: ["Rourke", "Hayate", "Wisp", "Tel'Annas"],
    answer: "Rourke",
  },
  {
    question: "Khi đạt bao nhiêu vàng thì bạn được xem là 'Full đồ'?",
    options: ["10,000 vàng", "15,000 vàng", "20,000 vàng", "25,000 vàng"],
    answer: "15,000 vàng",
  },
  {
    question: "Tướng nào có khả năng tạo phân thân khi dùng chiêu cuối?",
    options: ["Murad", "Nakroth", "Zill", "Raz"],
    answer: "Murad",
  },
  {
    question:
      "Trang bị 'Giáp Hộ Mệnh' hồi sinh người chơi với bao nhiêu % máu?",
    options: ["20%", "25%", "30%", "50%"],
    answer: "30%",
  },
  {
    question: "Tướng nào từng bị xóa khỏi Liên Quân Mobile ở server Việt Nam?",
    options: ["Wiro", "Violet", "Slimz", "Zephys"],
    answer: "Wiro",
  },
  {
    question: "Quái Rồng Ánh Sáng xuất hiện lần đầu ở phút thứ mấy?",
    options: ["2:00", "2:30", "3:00", "4:00"],
    answer: "2:00",
  },
  {
    question: "Chiêu cuối của tướng Lorion có khả năng gì đặc biệt?",
    options: [
      "Kéo mục tiêu vào tâm và gây sát thương",
      "Hồi máu cho đồng đội",
      "Làm choáng toàn bản đồ",
      "Tàng hình trong 5 giây",
    ],
    answer: "Kéo mục tiêu vào tâm và gây sát thương",
  },
  {
    question:
      "Tướng nào có khả năng reset thời gian hồi chiêu cuối nếu hạ gục hoặc hỗ trợ?",
    options: ["Quillen", "Nakroth", "Keera", "Murad"],
    answer: "Keera",
  },
];

function Quiz() {
  const [optionSelected, setOptionSelected] = useState("");
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length })
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [score, setScore] = useState(0);
  const handleSelectOption = (option, index) => {
    setOptionSelected(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  };

  const goNext = () => {
    if (currentQuestion === quizData.length - 1) {
      setIsQuizEnded(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const answer = Number(userAnswers[currentQuestion]);
    const passOptionSelected = quizData[currentQuestion].options[answer];

    if (answer !== undefined) {
      setOptionSelected(passOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
    setOptionSelected("");
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  };

  const rewatchQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  };

  useEffect(() => {
    if (optionSelected === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  }, [optionSelected]);

  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    );
  }
  return (
    <div>
      <h2>Câu {currentQuestion + 1}</h2>
      <p className="question">{quizData[currentQuestion].question}</p>
      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          onClick={() => handleSelectOption(option, index)}
        >
          {option}
        </button>
      ))}
      {optionSelected ? (
        optionSelected === quizData[currentQuestion].answer ? (
          <p className="correct-answer">Câu trả lời của bạn chính xác</p>
        ) : (
          <p className="incorrect-answer">Câu trả lời của bạn chưa chính xác</p>
        )
      ) : null}

      <div className="nav-buttons">
        <button onClick={goBack} disabled={currentQuestion === 0}>
          Quay lại
        </button>
        <button onClick={goNext} disabled={!optionSelected}>
          {currentQuestion === quizData.length - 1
            ? "Hoàn thành quiz"
            : "Kế tiếp"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
