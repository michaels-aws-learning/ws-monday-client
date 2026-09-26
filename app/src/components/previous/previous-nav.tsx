import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { usePreviousNavigation } from "../../context/previous-navigation-context";

type PreviousNavProps = {
    fallback?: string;
    label?: string;
};

export const PreviousNav = ({ fallback = "/", label = "Back" }: PreviousNavProps) => {
    const navigate = useNavigate();
    const { previousLocation } = usePreviousNavigation();

    const previousLabel = previousLocation?.pathname.startsWith("/portfolio")
        ? "Back to Portfolio"
        : previousLocation?.pathname.startsWith("/markets")
            ? "Back to Markets"
            : label;

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate(fallback);
    };

    return (
        <Button className="previous-nav" variant="ghost" size="sm" onClick={goBack}>
            <ArrowLeft /> {previousLabel}
        </Button>
    );
};