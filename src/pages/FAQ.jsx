import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const faqData = [
    {
      question: "How do I register to vote?",
      answer:
        "To register to vote, simply visit our website and click on the 'Register' button. Follow the instructions to complete the registration process.",
    },
    {
      question: "Can I change my vote after submitting it?",
      answer:
        "No, once you've submitted your vote, it cannot be changed. Make sure to carefully consider your choices before casting your vote.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, you can reset it by clicking on the 'Forgot Password' link on the login page. Follow the instructions to reset your password.",
    },
    {
      question: "Are the elections secure?",
      answer:
        "Yes, we take the security of our elections very seriously. Our platform utilizes encryption and other security measures to ensure the integrity of the voting process.",
    },
    {
      question: "Can I vote from my mobile phone?",
      answer:
        "Yes, our platform is mobile-friendly, allowing you to vote conveniently from your smartphone or tablet.",
    },
    {
      question: "How are the election results calculated?",
      answer:
        "The election results are calculated using a secure algorithm that ensures accuracy and fairness. The results are tabulated in real-time and can be viewed by all participants.",
    },
    {
      question: "What if I encounter technical issues while voting?",
      answer:
        "If you encounter any technical issues while voting, please contact our support team for assistance. We're here to help resolve any issues you may encounter.",
    },
    {
      question: "Can I vote for multiple candidates?",
      answer:
        "No, you can only vote for one candidate per position. Voting for multiple candidates will result in your vote being invalidated.",
    },
    {
      question: "Is my vote confidential?",
      answer:
        "Yes, we respect the confidentiality of your vote. Your voting choices are encrypted and anonymous, ensuring the privacy and integrity of the voting process.",
    },
    {
      question: "How can I verify that my vote was counted?",
      answer:
        "After casting your vote, you will receive a confirmation message indicating that your vote has been successfully recorded. You can also view the election results to verify the outcome.",
    },
    {
      question: "What if I miss the voting deadline?",
      answer:
        "If you miss the voting deadline, you will not be able to cast your vote. Make sure to check the election schedule and vote within the specified timeframe.",
    },
    {
      question: "Can I campaign for a candidate?",
      answer:
        "Yes, you are free to campaign for a candidate of your choice. However, please ensure that your campaign adheres to the rules and regulations set forth by our platform.",
    },
    {
      question: "Who is eligible to vote?",
      answer:
        "All registered users who meet the eligibility criteria set forth by our platform are eligible to vote. This includes students, faculty, and staff members of Madda Walabu University.",
    },
    {
      question: "How can I report election fraud?",
      answer:
        "If you suspect election fraud or any other irregularities, please report it to our support team immediately. We will investigate the matter thoroughly and take appropriate action.",
    },
    {
      question: "Can I request a recount?",
      answer:
        "Yes, you can request a recount if you believe there are discrepancies in the election results. Contact our support team to initiate the recount process.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20 text-black">
      <div className="container mx-auto px-6 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-pro">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {faqData.map((faq, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaQuestionCircle className="text-blue-500 text-4xl mr-3" />
                <h3 className="text-lg md:text-xl font-bold">{faq.question}</h3>
              </div>
              <p className="text-sm md:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
