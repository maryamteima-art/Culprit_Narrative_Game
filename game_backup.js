//Javascript New Game File 

//Setting Up
var start_btn = document.getElementById("start_button");

////Scene Objects/Containers: Question, Options, Images Transcipt, and Audio (regeneratable via looping) ("generated per selection")


var scenes = {
    current_scene: "step",
    step: {
        title: "",
        question: "Which building to the incident's setting?",
        image: "scene/step.png",
        audio:"sounds/step.mp3",
        transcript: "DETECTIVE: Alright looks like the murder took place here...would've been nice if the lieutenant told me which one it is instead of this silly riddle *sigh* oh well..can't back down now I guess",
        //In Js, html spec-tags (such as <div>, <input>, <label>) are contained in a list. Each option is seprated via objects that contains the html-specs
        options: [
            {
                option: "Left Building",
                next_step: "butler",
            },
            {
                option: "Right Building",
                next_step:"cop",
            }
        ]
    },

    butler:{
        title: "",
        question: "What's The PassCode?",
        image: "scene/butler.png",
        audio:"sounds/butler.mp3",
        transcript: "BUTLER: Reservation name or hostname please",
        
        options: [
            {
                option: "Hatem",
                next_step: "butler_correct",
            },
            {
                option: "Hazem",
                next_step:"butler_incorrect",
            }
        ]
    },

    cop:{
        title: "",
        question: "Who's the undercover officer?",
        image: "scene/cop.png",
        audio:"sounds/cop.mp3",
        transcript: "DETECTIVE: This doesn't look right...hmmm...there should be another entrance, maybe there's an undercover officer around here who knows the way; I mean...considering this is a serious crime scene after all. Hmm...which one though?",
        
        options: [
            {
                option: "Left person",
                next_step: "cop_correct",
            },
            {
                option: "Right person",
                next_step:"cop_incorrect",
            }
        ]
    },

    witness:{
        title: "",
        question: "How Should I Phrase This?",
        image: "scene/witness.png",
        audio:"sounds/witness.mp3",
        transcript: `WITNESS: Lemme guess police...or are you law...coming in the last-minute aren't ya! 
                    
                     DETECTIVE: Seems like this guy has some salt with the authorities`,

        options: [
            {
                option: "Haha yea...I'm a detective investigating Nadia's murder.",
                next_step: "redemption",
            },
            {
                option: "Apologies for the delay...I'm a detective, sent to investigate Nadia's murder.",
                next_step:"witness_correct",
            }
        ]
    },

    sneak:{
        title: "",
        question: "What now?",
        image: "scene/sneak.png",
        audio:"sounds/sneak.mp3",
        transcript: "DETECTIVE: Well,now what",
        
        options: [
            {
                option: "Call Lieutenant for another day",
                next_step: "call",
            },
            {
                option: "Check beside the building",
                next_step:"sneak_correct",
            }
        ]
    },

    alley:{
        title: "",
        question: "Where to search?",
        image: "scene/alley.png",
        audio:"sounds/alley.mp3",
        transcript:"DETECTIVE: Let's see there's got to be something useful here. Where to look....",
        
        options: [
            {
                option: "Near the door",
                next_step: "alley_correct",
            },
            {
                option: "Behind the trash can",
                next_step:"alley_incorrect",
            }
        ]
    },

    redemption:{
        title: "",
        question: "OH SHOOT! How should I redeem what I just said?",
        image: "scene/witness_incorrect.png",
        audio:"sounds/redemption.mp3",
        transcript: `DETECTIVE: Haha..yea...I'm a detective, I was sent to investigate Nadia's murder.
                     WITNESS: What do you mean haha? You think being late is funny?!`,
        
        options: [
            {
                option: "That's not what I meant, my sincerest apologies. I'm here to help out.",
                next_step: "suspect",
            },
            {
                option: "Look I'm not here to cause trouble, tell me what happened.",
                next_step:"bad_redeem",
            }
        ]
    },

    suspect:{
        title: "",
        question: "Who's the culprit?",
        image: "scene/suspect.png",
        audio:"sounds/suspect.mp3",
        transcript: "DETECTIVE: Let's see, which one has the bite mark...",
        
        options: [
            {
                option: "Left person",
                next_step: "bad_culprit",
            },
            {
                option: "Right person",
                next_step:"good_culprit",
            }
        ]
    },

    bad_redeem:{
        title: "",
        question: "Well...",
        image: "scene/redeem_bad.png",
        audio:"sounds/bad_redeem.mp3",
        transcript:`WITNESS: So you show up late, laugh it off, don't apologize and you just expect me to tell you what happened! 
                    You know what, get out!!! I ain't talking! Send in another detective who knows their manners!`,
        
        options: [
            {
                option: "Redo",
                next_step: "step",
            }
        ]
    },

    call:{
        title: "",
        question: "How should I convice Lieutanant?",
        image: "scene/call.png",
        audio:"sounds/call.mp3",
        transcript: "DETECTIVE: How should I say this...",
        
        options: [
            {
                option: "Some obstacles got in the way and it's running late. I need another day.",
                next_step: "bad_call",
            },
            {
                option: "I'm really close, I'm going to need another day on this case.",
                next_step:"good_call",
            }
        ]
    },

    bad_culprit:{
        title: "",
        question: "*Sigh*",
        image: "scene/suspect_incorrect.png",
        audio:"sounds/bad_culprit.mp3",
        transcript: `DETECTIVE: No bite mark, the blood doesn't match...this means...
                     CULPRIT: *Runs*
                     DETECTIVE: Hey!! Hey Hey!!! Lieutenant I need backup, Culprit's running away!!!
        `,
        
        options: [
            {
                option: "retry",
                next_step: "step",
            }
        ]
    },

    good_culprit:{
        title: "",
        question: "GREAT JOB DETECTIVE!",
        image: "scene/suspect_correct.png",
        audio:"sounds/good_culprit.mp3",
        transcript: `DETECTIVE: Well well well, bite mark...check!, blood match, *phone scan*...Check! Gaurd get the dog over here please.

        DOG: *Walks in*. 

        DETECTIVE: Hello little fella (*leans fabric near*) 

        DOG: *Sniff sniff*. Bark! Bark! Bark!

        DETECTIVE: Looks like we've got the culprit. *Signals to guards*

        GAURDS: *Cuff Culprit*.

        DETECTIVE: *Rings Phone*, Lieutanant, case has been solved.

        LIEUTANANT (caller):  Great Job detective! What'd ya say, you up for another challenge... 
        `,
        
        options: [
            {
                option: "Explore Another Path? (New trial)",
                next_step: "step",
            }
        ]
    },

    bad_call:{
        title: "AAARGH?!",
        question: "",
        image: "scene/call.png",
        audio:"sounds/bad_call.mp3",
        transcript: `DETECTIVE: Hey Lieutenant, Some obstacles got in the way, and it's running late. I need another day on this case.
        
        LIEUTENANT: Running late! It's 9pm!!! *sigh*, We're sending in another detective on the job,  
        someone who can actually get their work done. Goodbye Detective!!!

        DETECTIVE: Wait lieutenant!!! *Call cuts off*....This is NOT my day 
        `,
        
        options: [
            {
                option: "Retry",
                next_step: "step",
            }
        ]
    },

    good_call:{
        title: "Phew!",
        question: "",
        image: "scene/call.png",
        audio:"sounds/good_call.mp3",
        transcript: `DETECTIVE: Hey Lietanant I'm really really close to solving this case, but I'm going to need another day.
        
                     LIEUTENANT: Alright but only one day detective, do not disappoint me!`,
        
        options: [
            {
                option: "Have Another Go!",
                next_step: "step",
            }
        ]
    },

    butler_correct:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/butler_correct.png",
        audio:"sounds/butler_correct.mp3",
        transcript: `BUTLER: Welcome right this way ma'am, the guest is waiting.`,
        
        options: [
            {
                option: "-->",
                next_step: "witness",
            }
        ]
    },

    butler_incorrect:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/butler_incorrect.png",
        audio:"sounds/butler_incorrect.mp3",
        transcript: `BUTLER: Sorry ma'am. I'm going to have to ask you to leave, this hall is reserved for special guests only.`,
        
        options: [
            {
                option: "-->",
                next_step: "sneak",
            }
        ]
    },

    cop_correct:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/cop_correct.png",
        audio:"sounds/cop_correct.mp3",
        transcript: `DETECTIVE: Hey Detective here, I'm trying to enter the building where the murder incident occured.

        UNDERCOVER OFFICER: Passcode?
        
        DETECTIVE: Right here. 
        
        UNDERCOVER OFFICER: Alright, follow my lead, I'll let you in.`,
        
        options: [
            {
                option: "-->",
                next_step: "witness",
            }
        ]
    },

    cop_incorrect:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/cop_incorrect.png",
        audio:"sounds/cop_incorrect.mp3",
        transcript: `DETECTIVE: Hey Detective here, I'm trying to enter the building where the murder incident occured.

        Civilain: MURDER?! Sorry ma'am I'm just a visitor, I was just catching my bus...

        DETECTIVE: Oh sorry...Guess I'll just head to the other alley there, seems like a safe bet...`,
        
        options: [
            {
                option: "-->",
                next_step: "alley",
            }
        ]
    },

    witness_correct:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/witness_correct.png",
        audio:"sounds/witness_correct.mp3",
        transcript: `WITNESS: *Sigh* Alright...I'll take it...Look I don't know what happened...I just heard gunshots and the security dog barking. 
                    I came rushing in as fast as I could and..I...*sigh* she was dead. She angered a lot of people in the past week, lot's of boiled blood...but...
                    I-I wasn't expecting murder...I mean that's just...*sigh*......

                    Right sorry...where was I...AH I remember! The security dog! He came back with some fabric on his teeth...A good chunk too...
                    I'm guessing he chased the culprit out...probably bit'em too, there's quite a bit of blood on it. Here, *Hands Fabric*, does this help?
        
                    DETECTIVE: Yes it helps a lot, thank you, *phone scan* 
                    
                    PHONE: "--blood--type--identified--". 
                    
                    DETECTIVE: Don't worry consider the case solved...
        
                    WITNESS: Yea, thank you....Everyone's gathered in the main hall now. Nadia's visitors from the past week I mean...I'll lead you in.`,
        
        options: [
            {
                option: "-->",
                next_step: "suspect",
            }
        ]
    },

    sneak_correct:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/sneak_correct.png",
        audio:"sounds/sneak_correct.mp3",
        transcript: `DETECTIVE: Hold up is this ripped fabric?! ...Those are bite marks...
                    
                    PHONE: *scans* --DOG--BITE--Marks--Identified---
                    
                    DETECTIVE: Huh..says it's a dog bite...what does a dog- wait, could it be the security dog...but what does that have to do with-
                    Whoa wait wait wait!!! The culprit...they must have been escaping through the back door! Yes, Yes, and The security dog must've caught up to them...
                    AHA!...Yesss..there's their fingerprints! 

                    (*calls*)
        
                    DETECTIVE: Look Lietanant enough with the passcode-riddles, I need to get into the building I've found a dead gievaway!
        
                    Lieutanant (male): I just called the undercover officer in the area he says he'll take you there. Just follow his lead.`,
        
        options: [
            {
                option: "-->",
                next_step: "suspect",
            }
        ]
    },

    alley_correct:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/alley_correct.png",
        audio:"sounds/sneak_correct.mp3",
        transcript: `DETECTIVE: Hold up is this ripped fabric?! ...Those are bite marks...
                    
                    PHONE: *scans* --DOG--BITE--Marks--Identified---
                    
                    DETECTIVE: Huh..says it's a dog bite...what does a dog- wait, could it be the security dog...but what does that have to do with-
                    Whoa wait wait wait!!! The culprit...they must have been escaping through the back door! Yes, Yes, and The security dog must've caught up to them...
                    AHA!...Yesss..there's their fingerprints! 

                    (*calls*)
        
                    DETECTIVE: Look Lietanant enough with the passcode-riddles, I need to get into the building I've found a dead gievaway!
        
                    Lieutanant (male): I just called the undercover officer in the area he says he'll take you there. Just follow his lead.`,
        
        options: [
            {
                option: "-->",
                next_step: "suspect",
            }
        ]
    },

    alley_incorrect:{
        title: "~~~cutscene~~~",
        question: "",
        image: "scene/alley_incorrect.png",
        audio:"sounds/alley_incorrect.mp3",
        transcript: `Dang it! There's NOTHING here! *sigh* I need another day on this case...`,
        
        options: [
            {
                option: "-->",
                next_step: "call",
            }
        ]
    },
}

//Scene content: Referes to the div that holds the transcript, question and buttons
//Rest is Id-Obtainement
var content = document.getElementById("scene_content")
var option1 = document.getElementById("option_1");
var option2 = document.getElementById("option_2");
var next_btn = document.getElementById("next_button");
var question = document.getElementById("question");
var retry_btn = document.getElementById("retry_button");

//Starting the Scene
//Once we click start, perform the rendering function (does the displaying of html-contents specified in JS)
start_btn.addEventListener("click", render_scene)
    
function render_scene(){

    content.innerHTML = `
    <!--Scene Title, Question, Image and Transcript-->
    <!--$ {}  is like JQuery. It's Selectors for strings-->

    <h1 class = "js_text">${scenes[scenes.current_scene].title}</h1>
    <p class = "js_text">${scenes[scenes.current_scene].question}</p>

    <!--Get Inputs from The function we created (function numerically accesses the options-object and displays the options)-->
    ${get_options()}
    
    <!--Next Button-->
    <button class = "controller_container" id = "next_button">
        <p class = "option_text">Proceed!</p>
    </button> 

    `  

    var nextbtn = document.getElementById("next_button")
    nextbtn.addEventListener("click", function(){
        get_option_number()
    })
    //Change Image, Audio, transcript occurs after everything's rendered
    change_image(scenes[scenes.current_scene].image)

    change_audio(scenes[scenes.current_scene].audio)

    change_text(scenes[scenes.current_scene].transcript)
}

function get_option_number(){
    //Gets all the elements of type "radio" (radio inputs), and creates a list from it
    //The selector-quotes need to be different from specifier (type) quotes to avoid Js-mismatch
    var options = document.querySelectorAll("input[type = 'radio'")
    //iterate over all the radio options
    for (i = 0; i< options.length;i++){
    //obtain its value to proceed to next step (dependent on option chosen)
    //queryselectorAll places in an array, thus when referencing the index (to get the value), square brackets are used
    if (options[i].checked){
        //gets the data-type "next-step" of each option to proceed to next-scene (specific data-type "string-name" is generated in "get_options()" below)
        scenes.current_scene = options[i].getAttribute("data-next_step")
        render_scene()
    }
    }
    
}

//Core-Loop (iterates over choices and obtains the next-step attribute within the object to set it as the option's data-type (translates to string format and appends to data-) 

get_options()
function get_options(){
    //This empty string is where we'll store the text from the "option" object
    var options = ""

    //NOTES TO SELF:
    //The for loop iterates (loops) over the length of the options list. Once it gets to the end of the list, it stops looping.
    //Ex. If we had 2 choices, i starts at 0 and loops twice (0,1), since 1 is < 2, it stops looping over the "options" list (options list is inside the scenes object)
    for (i=0;i<scenes[scenes.current_scene].options.length;i++){

    //Here we store the html-specs and css styles onto the options string (that we find via iteration)
    //each time it loops, we go inside the "options" list and extract the option inside it, then we display inside the label.
    //the id name is changed according to the count number (gives the option number numerically/automatically for us)
    //data-next_step goes through the objects, looks at the option currently in (option[i]) and appends the next_step attribute (from the scenes object above) and sets it to be the input's data-    
        options += `
    
        <div class = "option_container">
            <input data-next_step = ${scenes[scenes.current_scene].options[i].next_step} id = "option_${i}" type = "radio" name = "option"></input>
            <label for "option_${i}" class = "option_container option_2 hide">${scenes[scenes.current_scene].options[i].option}</label>
        </div>
        `
    }
    return options
}

//Sub-Rendering Functions
function change_image (new_source){
    //Include the quotes in the parameters
    var Image = document.getElementById("image");
    Image.src = new_source;
    
    return new_source;
}

function change_audio (new_source){
    //Include the quotes in the parameters

    //Automatically Play New Audio
    var audio = new Audio(new_source);
    audio.load()
    audio.play()

   
    return audio;
}

//For question,buttons and/or transcript text changes
function change_text (new_text){
    //Include the quotes in the parameters
    var text_id = document.getElementById("transcript_text");
    text_id.innerText = new_text;
    
    return new_text
}