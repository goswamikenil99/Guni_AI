import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();
// console.log(contacts._id);
  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  const handleClick2 = (contact) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
  };

  return (
    <div className="mt-5">
      {contacts._id === 1  
      ? (
        <div
          key={contacts._id}
          className={`pl-10 py-2  transition-all duration-300 cursor-pointer ${
            contacts._id !=1
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111] "
          }`}
          // onClick={() => handleClick2(contacts)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 ">
                <AvatarFallback
                  className={`uppercase ${
                    contacts._id != 1
                      ? "bg-[#ffffff22] border border-white/50"
                      : getColor(contacts.color)
                  } h-10 w-10 flex items-center justify-center rounded-full`}
                >
                  {contacts.firstName.split("").shift()}
                </AvatarFallback>
              </Avatar>
            )}
            <span>{`${contacts.firstName} ${contacts.lastName}`}</span>
          </div>
        </div>
      )
      :
      (contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2  transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111] "
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 ">
                {contact.image && (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="rounded-full bg-cover h-full w-full"
                  />
                )}

                <AvatarFallback
                  className={`uppercase ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-[#ffffff22] border border-white/50"
                      : getColor(contact.color)
                  } h-10 w-10 flex items-center justify-center rounded-full`}
                >
                  {contact.firstName.split("").shift()}
                </AvatarFallback>
              </Avatar>
            )}
            {isChannel && (
              <div
                className={` bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full`}
              >
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      )))
    }
    </div>
  );
};

export default ContactList;
