//=============================================================================
jQuery.noConflict();
(
    //=========================================================================
    function($)
    {
        //#####################################################################
        $(document).ready(function()
        { 
            var chatSocket = new WebSocket('wss://hdwvgbrzvg.execute-api.us-east-1.amazonaws.com/dev/');
            var cMessageTxt = "";
            var outMsgTxt = "";
            var cMsgObj = ""; //JSON.stringify({ "action":"userMsg","userName": "Bilal","msgStr": "Send This Back! 2"});            
            
            // Connection opened
            chatSocket.addEventListener('open', function (event) 
            {
                cMessageTxt = cMessageTxt + "Socket Opened!\n";
                $("#incomingMsg_Txt").val(cMessageTxt);               
            });

            // Listen for messages
            chatSocket.addEventListener('message', function (event) 
            {
                if(event.data.length > 1)
                {
                    var dataObj = JSON.parse(event.data);
                    cMessageTxt = cMessageTxt + dataObj.message + "\n";
                    $("#incomingMsg_Txt").val(cMessageTxt);    
                    console.log('Server: ', dataObj.message);
                }
                
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
                console.log(cMsgObj);
                cMessageTxt = cMessageTxt + "Enter Room \n";
                $("#incomingMsg_Txt").val(cMessageTxt);
            }

            //=================================================================
            function sendMsg()
            {
                outMsgTxt = $("#outMsg_Txt").val();
                cMsgObj = JSON.stringify({ "action":"userMsg", "msgStr":outMsgTxt });
                chatSocket.send(cMsgObj);                
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