import { useEffect, useState } from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// Type imports
import { DateObject } from "helpers/dates";

function Countdown(props: { date: DateObject }) {
    const date = props.date.obj.getTime();
    const initialTime = date - new Date().getTime();
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const diff = date - now;
            setTimeRemaining(() => {
                if (diff < 0) {
                    clearInterval(timerInterval);
                    return 0;
                } else {
                    return diff;
                }
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [date]);

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const countdownArr = [];
    days > 0 && countdownArr.push(`${days}d`);
    days + hours > 0 && countdownArr.push(`${hours}h`);
    days + hours + minutes > 0 && countdownArr.push(`${minutes}m`);
    countdownArr.push(`${seconds}s`);

    return (
        <TextStyled variant="body2-styled" sx={{ my: "8px" }}>
            {timeRemaining > 0 ? (
                <>
                    {`Ends in `}
                    <StyledTooltip
                        title={`${props.date.date} ${props.date.time}`}
                        arrow
                        placement="bottom"
                    >
                        <span
                            style={{
                                textDecoration: "underline dotted",
                                cursor: "help",
                            }}
                        >
                            {countdownArr.join(" ")}
                        </span>
                    </StyledTooltip>
                </>
            ) : (
                <>Banner has ended</>
            )}
        </TextStyled>
    );
}

export default Countdown;
