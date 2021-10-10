import React, { Component } from 'react'
import './Helpandsupport.css'
import Faq from "react-faq-component";

export default class Helpandsupport extends Component {
    render() {
        const data = {
            rows: [
                {
                    title: "1. I am not able to upload the photo of Hospital.",
                    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                      ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                      In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                      Fusce sed commodo purus, at tempus turpis.`,
                },
                {
                    title: "2. I am having an issue regarding the appointment.",
                    content:
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                    ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                    In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                    Fusce sed commodo purus, at tempus turpis.`,
                },
                {
                    title: "3. I am having issue regarding the COVID Care Center.",
                    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                    ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                    In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                    Fusce sed commodo purus, at tempus turpis.`,
                },
                {
                    title: "4. I am having issue regaring the payment gateway.",
                    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                    ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                    In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                    Fusce sed commodo purus, at tempus turpis.`,
                },
                {
                    title: "5. I am having issue regaring the advertisement.",
                    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                    ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                    In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                    Fusce sed commodo purus, at tempus turpis.`,

                }
            ],
            
        };
        
        const styles = {    
            rowTitleColor: "#17252A",
            titleTextSize: '1.1rem',
            rowTitleTextSize: '1.2rem',
            rowContentColor: '#17252A',
            rowContentTextSize: '1.1rem',
            rowContentPaddingBottom: '10px',
            rowContentPaddingLeft: '50px',
            rowContentPaddingRight: '10px',
            arrowColor: "#2B7A79",
            transitionDuration: "0.4s",
            timingFunc: "ease",
            tabFocus: true
        };
        
        const config = {
            animate: true,
            arrowIcon: "",
            tabFocus: true
        };
        return (
            <div className="dashboardComponentViewFeed">
                <div className="help-container">
                    <div className="help-title">
                        <h4><i className="far fa-question-circle"></i>Frequently Asked Questions</h4>
                        
                    </div>
                    <div className="help-ques">
                        <Faq
                        data={data}
                        styles={styles}
                        config={config}
                        /> 
                    </div>
                    <p className="faqFooter">Phone No: <a className="faqPhoneNo" href="tel://+91 987477474"><i className="fas fa-phone-alt fa-phone-faq"></i> +91 987477474</a>
                    &nbsp;&nbsp;&nbsp;
                    Email: <a className="faqPhoneNo" href="mailto: abc@example.com"><i className="fas fa-envelope fa-envelope-faq"></i>doctorsapp@gmail.com</a></p>
                </div>
            </div>
        )
    }
}
