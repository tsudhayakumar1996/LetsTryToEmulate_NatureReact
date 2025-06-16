import CmnButton from '@/commonComponents/cmnButton'
import CmnIcnBtn from '@/commonComponents/cmnIcnBtn'
import CmnModal from '@/commonComponents/cmnModal'
import CenterContnr from '@/commonComponents/cntrAlgnContnr'
import { HeaderOneVarientTypo } from '@/typography'
import { List, ListItem } from '@mui/material'
import { useState } from 'react'

const InfoViewToUsr = () => {
    // state
    const [show, setshow] = useState(false)

    return (
        <>
            <CmnIcnBtn
                sx={{
                    position: 'absolute',
                    bottom: 180,
                    right: 20
                }}
                onClick={() => setshow(true)}
            >
                🗣️
            </CmnIcnBtn>
            <CmnModal
                open={show}
                onClose={() => setshow(false)}
            >
                <>
                    <CenterContnr>
                        <HeaderOneVarientTypo text="💡🫡" />
                    </CenterContnr>
                    <List>
                        <ListItem>
                            {' '}
                            First things first — pick your current location! 🌍 You’ll need to be near the spot you’re
                            suggesting, so we can keep things accurate.{' '}
                        </ListItem>{' '}
                        <ListItem>
                            {' '}
                            We’ve locked the map for better precision — but hey, GPS isn’t always perfect. Sometimes it
                            shows you chilling miles away from where you actually are. 🤷‍♂️{' '}
                        </ListItem>{' '}
                        <ListItem sx={{ pb: 0 }}>
                            {' '}
                            No worries though! You can drag the{' '}
                            <img
                                src="https://apis.mappls.com/map_v3/1.png"
                                alt="pin"
                                style={{ width: '20px', marginLeft: '5px' }}
                            />
                        </ListItem>{' '}
                        <ListItem sx={{ pt: 0 }}>
                            pin on the map to fix your spot. Just grab it, move it to the right place, and boom —
                            accuracy upgraded! 💪{' '}
                        </ListItem>{' '}
                        <ListItem>
                            {' '}
                            Once your location’s good to go, hit the ➕ to upload a photo of the place. Snap it, tag it,
                            and you’re ready to create a new spot! 📸✨{' '}
                        </ListItem>{' '}
                        <ListItem>
                            {' '}
                            Sure, you *could* upload something random and drop pins everywhere like a wild explorer...
                            but let’s keep it meaningful, okay? 😅 Let’s make the map awesome together! 🙌{' '}
                        </ListItem>
                    </List>
                    <CenterContnr>
                        <CmnButton
                            title="Got it"
                            variant="outlined"
                            onClick={() => setshow(false)}
                            sx={{ m: '0 auto' }}
                        />
                    </CenterContnr>
                </>
            </CmnModal>
        </>
    )
}

export default InfoViewToUsr
