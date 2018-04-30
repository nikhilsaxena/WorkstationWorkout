'use strict';
const Alexa = require('alexa-sdk'); //import the library

const APP_ID = undefined;

const not_speech ="Ohh, No. not this one. Let's start with the next bell.";
const main_bell = "<audio src='https://s3.amazonaws.com/ask-soundlibrary/foley/amzn_sfx_glasses_clink_03.mp3'/>";

function getStartBell()
{
    var bells =
	[
	 "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_crow_caw_1x_01.mp3'/>",
     "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_cat_meow_1x_01.mp3'/>",
     "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_bird_robin_chirp_1x_01.mp3'/>",
     "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_bird_chickadee_chirp_1x_01.mp3'/>",
     "<audio src='https://s3.amazonaws.com/ask-soundlibrary/animals/amzn_sfx_dog_med_bark_1x_01.mp3'/>"	 
	];
	
	var bellSound = randomPhrase(bells);
	return bellSound;
}

function randomPhrase(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}

function getBellSound()
{
	return getStartBell() + " " + not_speech + " " + main_bell;
}

const ERROR_MSG = "Sorry, It's something, I am not familiar in this Workout. You can choose among Eyes, Neck, Shoulders, Wrist, Fingers, Back, Hands, Legs and Shoulder Blade. Just name anyone.";


//This is the welcome message for when a user starts the skill without a specific intent.
const WELCOME_MESSAGE =  "Welcome to Workstation Workout. I am your Today's Fitness Trainer Jinny. Please Note, These stretches are for Workstation stress, if you \
                         are having excessive pain in your body parts, better Visit a Doctor. So, I Know you are Working hard and need some rest.\
                         Here, I will help you with various Body Stretches, which you can perform at your Workstation or even at your Home also. \
                         Before starting todays Session, I want you to Sit on a Chair. Please, find a Seat and once settled, Just say settled to Continue Ahead.";						 
						 
const settled_chair = "Great. Since, you are Settled. Let me ask, which body part you want to stretch now.\
                       You can ask for Eyes, Neck, Shoulders, Wrist, Fingers, Back, Hands, Legs and Shoulder Blade.\
					   Simply name anyone to start. What would you like to do?";						 

					   
//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
const EXIT_SKILL_MESSAGE = "Body Stretches are an important part in Work Life Balance. Stay Fit and Healthy. Bye Bye"; 

const EXIT_SKILL = "Repeating these Stretches, Will help you, reduce your Distress. Thanks and Have a Nice Day.";
//This is the message a user will hear after they ask (and hear) about a specific data element.
 
const CATEGORY_HELP = "You can ask for Eyes, Neck, Shoulders, Wrist, Fingers, Back, Hands, Legs and Shoulder Blade.\
					   Simply name anyone to start. What would you like to do?";

const CATEGORY_HELP_CONFIRM = "What, would you like to do?";

const HELP_SETTLED_MESSAGE = "Look for a Seat around. Once you are settled comfortably, just say Settled to continue.";
	
const NO_MSG = "If you want to quit this Stretch, just say Stop to Exit.";	
	
const BODY_EYE_HELP       = "You can say start to Continue with Eyes. Or you can Say Stop to exit.";	 
const BODY_NECK_HELP      = "You can say start to Continue with Neck. Or you can Say Stop to exit.";
const BODY_SHOULDER_HELP  = "You can sat start to Continue with Shoulders. Or you can Say Stop to exit.";
const BODY_WRIST_HELP     = "You can say start to Continue with Wrist. Or you can Say Stop to exit.";
const BODY_FINGER_HELP    = "You can say start to Continue with Fingers. Or you can Say Stop to exit.";
const BODY_BACK_HELP      = "You can say start to Continue with Back. Or you can Say Stop to exit.";	 
const BODY_HANDS_HELP     = "You can say start to Continue with Hands. Or you can Say Stop to exit.";
const BODY_LEGS_HELP      = "You can say start to Continue with Legs. Or you can Say Stop to exit.";
const BODY_SBLADE_HELP    = "You can say start to Continue with Shoulder Blade. Or you can Say Stop to exit.";
	 
const REPROMPT_EYE_SPEECH       = "You want to stretch your Eyes, Right? Say Yes, to start" ;	 
const REPROMPT_NECK_SPEECH      = "You want to stretch your Neck, Right? Say Yes, to start";
const REPROMPT_SHOULDERS_SPEECH = "You want to stretch your Shoulders, Right? Say Yes, to start";
const REPROMPT_WRIST_SPEECH     = "You want to stretch your Wrist, Right? Say Yes, to start";
const REPROMPT_FINGERS_SPEECH   = "You want to stretch your Fingers, Right? Say Yes, to start";
const REPROMPT_BACK_SPEECH      = "You want to stretch your Back, Right? Say Yes, to start";	 
const REPROMPT_HANDS_SPEECH     = "You want to stretch your Hands, Right? Say Yes, to start";
const REPROMPT_LEGS_SPEECH      = "You want to stretch your Legs, Right? Say Yes, to start";
const REPROMPT_SBLADE_SPEECH    = "You want to stretch your Shoulder Blade, Right? Say Yes, to start";

const states = {
    START: "_START",
    EYES: "_EYES",
	NECK: "_NECK",
	SHOULDERS: "_SHOULDERS",
	WRIST: "_WRIST",
	FINGERS: "_FINGERS",
	BACK: "_BACK",
	HANDS: "_HANDS",
	LEGS: "_LEGS",
	SHOULDER_BLADE: "_SHOULDER_BLADE",
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
	"getLaunchIntent": function(){
	    this.handler.state = states.START;
		this.emitWithState("Start");
	},
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_SETTLED_MESSAGE).listen(HELP_SETTLED_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        let error_msg = "It's someting, I am not familiar in this Workout. Just name a Body part, to stretch.";
		this.response.speak(error_msg).listen(HELP_SETTLED_MESSAGE);
		this.emit(":reponseReady");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_SETTLED_MESSAGE);
        this.emit(":responseReady");
    },
	"getChairIntent" : function() {
	    this.response.speak(settled_chair).listen(CATEGORY_HELP);
		this.emit(":responseReady");	
	},
	"AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_SETTLED_MESSAGE).listen(HELP_SETTLED_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.handler.state=states.START;
        this.emit(":responseReady");
        
    },
    "getBodyIntent" : function(){
	 let bodyPart = this.event.request.intent.slots;
	 if(compareSlots(bodyPart,"eyes") || compareSlots(bodyPart,"eye") || compareSlots(bodyPart,"eyes please"))
		{
			
			    this.handler.state = states.EYES;
			    this.emitWithState("Eyes");
			
		}
		else if(compareSlots(bodyPart,"neck") || compareSlots(bodyPart,"neck") || compareSlots(bodyPart,"neck please"))
		{
			
			    this.handler.state = states.NECK;
			    this.emitWithState("Neck");
			
		}
		else if(compareSlots(bodyPart,"shoulders") || compareSlots(bodyPart,"shoulder") || compareSlots(bodyPart,"shoulders please"))
		{
			
			    this.handler.state = states.SHOULDERS;
			    this.emitWithState("Shoulders");
			
		}
		else if(compareSlots(bodyPart,"wrist") || compareSlots(bodyPart,"wrists") || compareSlots(bodyPart,"wrist please"))
		{
			
			    this.handler.state = states.WRIST;
			    this.emitWithState("Wrist");
			
		}
		else if(compareSlots(bodyPart,"fingers") || compareSlots(bodyPart,"finger") || compareSlots(bodyPart,"fingers please"))
		{
			
			    this.handler.state = states.FINGERS;
			    this.emitWithState("Fingers");
			
		}
		else if(compareSlots(bodyPart,"back") || compareSlots(bodyPart,"back please"))
		{
			
			    this.handler.state = states.BACK;
			    this.emitWithState("Back");
			
		}
		else if(compareSlots(bodyPart,"hands") || compareSlots(bodyPart,"hand") || compareSlots(bodyPart,"hands please"))
		{
			
			    this.handler.state = states.HANDS;
			    this.emitWithState("Hands");
			
		}
		else if(compareSlots(bodyPart,"legs") || compareSlots(bodyPart,"leg") || compareSlots(bodyPart,"legs please"))
		{
			
			    this.handler.state = states.LEGS;
			    this.emitWithState("Legs");
			
		}
		else if(compareSlots(bodyPart,"shoulder blade") || compareSlots(bodyPart,"shoulder blade please"))
		{
			
			    this.handler.state = states.SHOULDER_BLADE;
			    this.emitWithState("ShoulderBlade");
			
		}
		else
		{
		        this.response.speak(ERROR_MSG).listen(CATEGORY_HELP);
				this.emit(":responseReady");
		}
	}
});	
	


const shoulderBladeHandlers = Alexa.CreateStateHandler(states.SHOULDER_BLADE,{
	"ShoulderBlade": function(){
	    let bodyConfirm="Shoulder Blade, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_SBLADE_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_SBLADE_HELP).listen(BODY_SBLADE_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_ShoulderBlade");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_ShoulderBlade": function(){
        let shoulderblade_intro = "This Stretch is called Relax your Shoulder Blade. For this stretch you have to     \
                          place your hands behind your head, making V shapes both sides on your left and right.       \
                          Now you have to pull your head backwards. No need to pull it hard, just a mild pressure.    \
                          Next, you have to spread your hands, far away from each other. We will hold each position,  \
						  till I count 10. We will repeat each stretch 2 times.                                       \
                          Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(shoulderblade_intro).listen(BODY_SBLADE_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let shoulderblade_exercise = "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start.        \
		                             Place your hands, at the back of your head. Now, start pulling your head backwards, slowly.\
							         <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                 \
							         Now, spread your hands, far away from each other.                                          \
							         <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                 \
							         Place your hands, at the back of your head. Now, start pulling your head backwards slowly. \
							         <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                 \
							         Now, spread your hands, far away from each other.                                          \
							         <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                 \
							         </prosody>" + main_bell + "Your Shoulder Blade must be relaxed now. You can repeat this    \
							         Stretch, after every 30 minutes. " + EXIT_SKILL;
        this.response.speak(shoulderblade_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_SBLADE_HELP).listen(BODY_SBLADE_HELP);
        this.emit(":responseReady");
    }
});


const legsHandlers = Alexa.CreateStateHandler(states.LEGS,{
	"Legs": function(){
	    let bodyConfirm="Legs, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_LEGS_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_LEGS_HELP).listen(BODY_LEGS_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Legs");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Legs": function(){
        let legs_intro = "This Stretch is called Relax your Legs. For this stretch you have to                               \
                          sit straight. Now, you have to raise both your legs. You don't have to raise them too high.        \
						  Next you have to move both your legs in Circular direction. Making Circle  through your toes.      \
						  Make sure, you are circling your legs in opposite direction. We will start with, moving right leg  \
						  in Clockwise direction and left leg in Anti-clockwise direction. We will continue this till I      \
						  count 10. Then, we will reverse the order. Right leg in Anti-clockwise direction and left in       \
						  Clockwise direction. We will repeat these stretch two times each.                                  \
						  Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(legs_intro).listen(BODY_LEGS_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let legs_exercise = "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start.       \
		                     Start circling your toes, right leg in Clockwise and left in Anti-Clockwise direction.   \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                               \
							 Now, reverse your order. Right in Anti-Clockwise and Left in Clockwise direction.        \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                               \
							 Start circling your toes, right leg in Clockwise and left in Anti-Clockwise direction.   \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                               \
							 Now, reverse your order. Right in Anti-Clockwise and Left in Clockwise direction.        \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                               \
							 </prosody>" + main_bell + "Your Legs must be relaxed now. You can repeat this            \
							 Stretch, after every 30 minutes. " + EXIT_SKILL;
							
        this.response.speak(legs_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_LEGS_HELP).listen(BODY_LEGS_HELP);
        this.emit(":responseReady");
    }
});

const handsHandlers = Alexa.CreateStateHandler(states.HANDS,{
	"Hands": function(){
	    let bodyConfirm="Hands, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_HANDS_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_HANDS_HELP).listen(BODY_HANDS_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Hands");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Hands": function(){
        let hands_intro =  " This Stretch is called Relax your Hands. For this stretch you have to           \
                             sit straight. Next, place your hands in the driving position, with fists close and \
							 in upward direction. Now, you have to bend your elbow, bringing your closed fist   \
							 towards you. Observe that your hands are making L shape. We will hold each position\
							 till i count 3. We will repeat this stretch 5 times each.                          \
							 Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(hands_intro).listen(BODY_HANDS_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let hands_exercise ="<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start. \
		                    Keep your hands straight with fists closed and in upward direction.                 \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Now, bend your elbow, making a L shape.                                             \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Keep your hands straight with fists closed and in upward direction.                 \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Now, bend your elbow, making a L shape.                                             \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Keep your hands straight with fists closed and in upward direction.                 \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Now, bend your elbow, making a L shape.                                             \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Keep your hands straight with fists closed and in upward direction.                 \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Now, bend your elbow, making a L shape.                                             \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Keep your hands straight with fists closed and in upward direction.                 \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
                            Now, bend your elbow, making a L shape.                                             \
                            <break time='1s'/> 1, 2, 3. Release.                                                \
 							</prosody>" + main_bell + "Your Hands must be relaxed now. You can repeat this\
							  Stretch, after every 30 minutes. " + EXIT_SKILL;							
        this.response.speak(hands_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_HANDS_HELP).listen(BODY_HANDS_HELP);
        this.emit(":responseReady");
    }
});



const backHandlers = Alexa.CreateStateHandler(states.BACK,{
	"Back": function(){
	    let bodyConfirm="Back, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_BACK_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_BACK_HELP).listen(BODY_BACK_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Back");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Back": function(){
        let back_intro = "This Stretch is called Relax your Back. For this stretch you have to                      \
                          stand up. Place your hands at your back, slightly above your hips.                        \
						  Now, you have to start leaning back slowly. After that, you have to start leaning forward.\
						  We will hold each position till I Count 10. We will repeat each stretch 2 times.          \
                          Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(back_intro).listen(BODY_BACK_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let back_exercise =" <prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start.     \
		                      Place you hands at your back, just above your hips and start leaning back.            \
                              <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. release.                          \
                              Now, start leaning in the forward direction.                                          \
							  <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. release.                          \
                              Now, start leaning backwards.                                                         \
                              <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. release.                          \
                              Now, start leaning in the forward direction.                                          \
							  <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. release.                          \
							  </prosody>" + main_bell + "Your Back must be relaxed now. You can repeat this         \
							  Stretch more often. " + EXIT_SKILL;
        this.response.speak(back_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_BACK_HELP).listen(BODY_BACK_HELP);
        this.emit(":responseReady");
    }
});


const fingersHandlers = Alexa.CreateStateHandler(states.FINGERS,{
	"Fingers": function(){
	    let bodyConfirm="Fingers, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_FINGERS_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_FINGER_HELP).listen(BODY_FINGER_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Fingers");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Fingers": function(){
        let fingers_intro = "This Stretch is called as Relax your Fingers. For this stretch, you have to    \
                             imagine that, you are holding a soft ball or a foam ball. Next you have to     \
							 squeeze it as hard as you can. After that, you have to lock your hands in      \
                             each other, using fingers, such that no space is left between the fingers,     \
							 then try to push your hands in upward direction, such that your hand palms     \
							 are at upper side. We will hold each position, till i Count 10.                \
							 Once you are ready with your posture.  just say start to go ahead.";
    	this.response.speak(fingers_intro).listen(BODY_FINGER_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let fingers_exercise ="<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start.     \
		                      Imagine you are holding foam balls in your hands. Start squeezing it as hard as you can \
                              <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. release.                            \
                              Next, lock your hands with fingers, such that no space is left in between the fingers.  \
                              Now, push your hands in upward directions. hold this till i count 10.                   \
                              <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                              \
                              </prosody>" + main_bell + "Your Fingers must be relaxed now. You can repeat this        \
							  Stretch, whenever you are free. " + EXIT_SKILL;					  
        this.response.speak(fingers_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_FINGER_HELP).listen(BODY_FINGER_HELP);
        this.emit(":responseReady");
    }
});


const wristHandlers = Alexa.CreateStateHandler(states.WRIST,{
	"Wrist": function(){
	    let bodyConfirm="Wrist, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_WRIST_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_WRIST_HELP).listen(BODY_WRIST_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Wrist");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Wrist": function(){
        let wrist_intro = "This Stretch is called Relax your Wrist. For this stretch you have to                        \
                           keep your hands in the driving position. Imagine, you are holding a steering.                \
						   You have to spread your fingers to the maximum.                                              \
						   .And then you have to close your fists tightly again.                                        \
						   We will hold each position till i count 10. We will repeat each stretch two times.           \
                           Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(wrist_intro).listen(BODY_WRIST_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let wrist_exercise = "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start. \
		                     Take the driving posture with hands straight, now try to spread you fingers to the maximum. \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.\
							 Now, Close your fists tightly. <break time='1s'/>          \
                             1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                   \
                             Now, try to spread you fingers to the maximum.             \
							 <break time='1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.\
							 Now, Close your fists tightly. <break time='1s'/>          \
                             1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                   \
							 </prosody>" + main_bell + "Your Wrist must be relaxed now. You can repeat this\
							 Stretch more oftenly for your Wrist. " + EXIT_SKILL;
        this.response.speak(wrist_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_WRIST_HELP).listen(BODY_WRIST_HELP);
        this.emit(":responseReady");
    }
});



const shoulderHandlers = Alexa.CreateStateHandler(states.SHOULDERS,{
	"Shoulders": function(){
	    let bodyConfirm="Shoulders, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_SHOULDERS_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_SHOULDER_HELP).listen(BODY_SHOULDER_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Shoulders");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Shoulders": function(){
        let shoulders_intro = "This Stretch is called Relax your Shoulders. For this stretch you have to       \
                               keep your hands straight, loosed in downward direction. Next you have to move   \
							   your shoulders in forward circular direction and then same in reverse circular  \
							   direction. We will hold each position till i count 10. We will perform each     \
							   stretch two times.                                                              \
							   Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(shoulders_intro).listen(BODY_SHOULDER_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let shoulders_exercise = "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start. \
    		                       Hang your hands straight, downwards. Now start moving your shoulders in forward   \
								   circular direction <break time='1s'/>                                              \
                                   1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Relase.                                            \
                                   Now start moving your shoulders in backward or Reverse circular direction         \
                                   <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Relase.                        \
								   Now start moving your shoulders in forward                                        \
								   circular direction <break time='1s'/>                                              \
                                   1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Relase.                                            \
                                   Now start moving your shoulders in backward or Reverse circular direction         \
                                   <break time = '1s'/> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Relase.                        \
								   </prosody>" + main_bell + "Your Shoulders must be relaxed now. You can repeat this\
							       Stretch whenever you are feeling pain in your shoulders. " + EXIT_SKILL;
								 
        this.response.speak(shoulders_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_SHOULDER_HELP).listen(BODY_SHOULDER_HELP);
        this.emit(":responseReady");
    }
});

const neckHandlers = Alexa.CreateStateHandler(states.NECK,{
	"Neck": function(){
	    let bodyConfirm = "Neck, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_NECK_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_NECK_HELP).listen(BODY_NECK_HELP);
        this.emit(":responseReady");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Neck");
    },
    "Start_Neck": function(){
        let neck_intro = "This Stretch is called Relax your Neck. For this stretch you have to sit straight,  \
                          with your back in contact with the seat. In this stretch, you have to look down, up,\
						  left and right. We will hold each position, till i Count 10. While looking down     \
						  You have to rest your chin on your neck. While looking up you have to stare at      \
						  the Ceiling. I will let you know, when you have to change your neck position.       \
						  Once you are ready with your posture, just say start to go ahead.";
        this.response.speak(neck_intro).listen(BODY_NECK_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let neck_exercise =  "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start.        \
		                      Look down, resting your chin, on your neck. <break time = '2s'/>                          \
							  1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                                   \
							  Look up, at the Ceiling.<break time = '2s'/>                                              \
							  1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                                   \
							  Look Left, with your nose and left Shoulder parallel to each other.<break time = '2s'/>   \
							  1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                                   \
							  Look Right, with your nose and right Shoulder parallel to each other.<break time = '2s'/> \
							  1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Release.                                                   \
							  </prosody>" + main_bell + "Your Neck must be relaxed now. You can repeat this             \
							  Stretch whenever you are feeling pain in your neck. " + EXIT_SKILL;
							  
        this.response.speak(neck_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_NECK_HELP).listen(BODY_NECK_HELP);
        this.emit(":responseReady");
    }
});


const eyeHandlers = Alexa.CreateStateHandler(states.EYES,{
	"Eyes": function(){
	    let bodyConfirm="Eyes, Right?";
	    this.response.speak(bodyConfirm).listen(REPROMPT_EYE_SPEECH);
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(BODY_EYE_HELP).listen(BODY_EYE_HELP);
        this.emit(":responseReady");
    },
    "AMAZON.YesIntent": function(){
        this.emitWithState("Start_Eyes");
    },
	"AMAZON.NoIntent": function(){
	    this.response.speak(NO_MSG).listen(BODY_EYE_HELP);
		this.emit(":responseReady");
	},
    "Start_Eyes": function(){
        let eye_intro = "This Stretch is called Relax your Eyes. You have to close and open your eyes in this stretch       \
                         for every 3 seconds, and we will repeat this, for 5 times. I will let you know, when you have to   \
                         close and open your eyes.  Before starting this stretch, I want you to change your angle and       \
                         keep your sight away from the system. Once you are ready with your posture, just say start to      \
                         go ahead.";
        this.response.speak(eye_intro).listen(BODY_EYE_HELP);
        this.emit(":responseReady");
    },
    "getStart": function(){
        let eye_exercise = "<prosody rate='85%'> We Will start with the Bell." + getBellSound() + "Lets Start \
		Close your Eyes <break time='1s'/>  1, 2, 3.\
		Open Your Eyes  <break time='1s'/>  1, 2, 3.\
		Close your Eyes <break time='1s'/>  1, 2, 3.\
		Open Your Eyes  <break time='1s'/>  1, 2, 3.\
		Close your Eyes <break time='1s'/>  1, 2, 3.\
		Open Your Eyes  <break time='1s'/>  1, 2, 3.\
		Close your Eyes <break time='1s'/>  1, 2, 3.\
		Open Your Eyes  <break time='1s'/>  1, 2, 3.\
		Close your Eyes <break time='1s'/>  1, 2, 3.\
		Open Your Eyes  <break time='1s'/>  1, 2, 3.\
		</prosody>" + main_bell + "Release. Your Eyes must be relaxed now. You can repeat this Stretch whenever\
		you are feeling heaviness in your eyes. " + EXIT_SKILL;
        this.response.speak(eye_exercise);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(BODY_EYE_HELP).listen(BODY_EYE_HELP);
        this.emit(":responseReady");
    }
});

function compareSlots(slots, value)
{
    for (let slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}


exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, eyeHandlers, neckHandlers, shoulderHandlers, wristHandlers,fingersHandlers, backHandlers, handsHandlers, legsHandlers, shoulderBladeHandlers);
    alexa.execute();
};	
