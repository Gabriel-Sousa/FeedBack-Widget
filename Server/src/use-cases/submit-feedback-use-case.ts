import { MailAdapter } from "../adapters/mail-adapters"
import { FeedbacksRepository } from "../repositories/feedbacks-repositiories"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if(!type){
            throw new Error("Type is required")
        }
        if(!comment){
            throw new Error("Type is comment")
        }
        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error("invalid screenshot")
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })
        

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color: #111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot != "data:image/png;base64, null"?
                `<img src="${screenshot}"></img>`:"",
                
                    

                `</div>`
            ].join("\n")
        })

    }
}