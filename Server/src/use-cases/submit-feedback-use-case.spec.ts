import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espiões
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()


const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe("Submit Feedback", () => {
    it("should be able to submit a feedback", async()=>{
        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "data:image/png;base64,6da26a6d2452v96g"
        })).resolves.not.toThrow();

        expect(sendMailSpy).toHaveBeenCalled()
        expect(createFeedbackSpy).toHaveBeenCalled()
        // 1.48
    })

    
    it("should not be able to submit a feedback without type", async()=>{
        
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64,6da26a6d2452v96g"
        })).rejects.toThrow();
        // 1.48
    })
    it("should not be able to submit a feedback without comment", async()=>{
        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,6da26a6d2452v96g"
        })).rejects.toThrow();
        // 1.48
    })
    it("should not be able to submit a feedback without screenshot", async()=>{
        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "test.png"
        })).rejects.toThrow();
        // 1.48
    })
})