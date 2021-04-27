//=============================================================================
jQuery.noConflict();
(
    //=========================================================================
    function($)
    {
        //#####################################################################
        $(document).ready(function()
        { 
            var cMessageTxt = "";
            var outMsgTxt = "";
            var cMsgObj = JSON.stringify({"action":"connect","msgStr":"Bilal"});

            var chatSocket = new WebSocket('wss://hdwvgbrzvg.execute-api.us-east-1.amazonaws.com/dev/');

            // Connection opened
            chatSocket.addEventListener('open', function (event) 
            {
                chatSocket.send(cMsgObj);
            });

            // Listen for messages
            chatSocket.addEventListener('message', function (event) 
            {
                console.log('Message from server ', event.data);
            });

            //=================================================================
            $("#exitBtn").click(function(){ exitRoom(); });            
            $("#connectBtn").click(function(){ connectToRoom(); });
            $("#chatBtn").click(function(){ sendMsg(); });

            //=================================================================
            function exitRoom()
            {
                cMessageTxt = cMessageTxt + "Exit Room \n";
                $("#incomingMsg_Txt").val(cMessageTxt);
            }
           
            //=================================================================
            function connectToRoom()
            {    
                
                


                cMessageTxt = cMessageTxt + "Enter Room \n";
                $("#incomingMsg_Txt").val(cMessageTxt);
            }

            //=================================================================
            function sendMsg()
            {
                outMsgTxt = $("#outMsg_Txt").val()  + "\n";
                cMessageTxt = cMessageTxt + outMsgTxt;
                $("#incomingMsg_Txt").val(cMessageTxt);
                $("#outMsg_Txt").val("");
            }

            //=================================================================
            $("#outMsg_Txt").keydown(function(event)
            {
                if(event.key == "Enter")
                {
                    sendMsg();
                }
            });


        });
        //#####################################################################
    }
    //=========================================================================
)(jQuery);