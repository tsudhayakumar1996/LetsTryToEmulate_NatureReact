import { CARING_ROUTE, SUGGEST_PLACE_ROUTE, SUPPORT_ROUTE } from '@/const/uiRoute'

export type CJProps = {
    head: string
    subHead: string
    img: string
    actionHead: string
    actionFor: 'redirect' | 'scroll'
    scrollIndex: number
    redirectURL: string
    actionBtnLabel: string
    typeWrtrCntnt: string
}

export const contentJson: CJProps[] = [
    {
        head: 'Udhay...',
        subHead: "Hey, it's me",
        img: '/img/me.jpeg',
        actionHead: 'Wanna know more? Click below 👇',
        actionFor: 'scroll',
        scrollIndex: 1,
        redirectURL: '',
        actionBtnLabel: '↓',
        typeWrtrCntnt:
            'I’m a software developer — I mostly deal with code, bugs, and coffee. But outside the screen, there’s something way more beautiful: nature. It gives us everything... and asks for nothing. So here’s my small way of saying thanks: I want to plant at least 1,00,000 trees. Yep, you read that right. Big goal? For sure. But I’m serious — I’ll be the one digging and planting. All I ask is a little help from you now and then. Let’s grow this dream together — one tree at a time 🌱.'
    },
    {
        head: 'Find a Spot',
        subHead: 'Know a place where a tree can grow? Suggest it!',
        img: 'https://images.pexels.com/photos/6181105/pexels-photo-6181105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        actionHead: 'Suggest a location 🧭',
        actionFor: 'redirect',
        scrollIndex: 0,
        redirectURL: SUGGEST_PLACE_ROUTE,
        actionBtnLabel: 'Add 🧭',
        typeWrtrCntnt:
            'Finding the right spot to plant isn’t always easy. Some places are tricky, and some people don’t like surprises. So, I’ve added this feature: if you know a good spot, suggest it! You’ll need to be near that location and allow GPS — because, let’s be real, you can’t suggest Antarctica from your sofa. 😅'
    },
    {
        head: 'Plantation',
        subHead: 'I do the planting. Some times...',
        img: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        actionHead: 'See what’s growing 🌿',
        actionFor: 'scroll',
        scrollIndex: 3,
        redirectURL: '',
        actionBtnLabel: '↓',
        typeWrtrCntnt:
            'Once a location is suggested, I’ll check it out. If it works — I’ll plant there! If not, I’ll pick another spot and get to work. You’ll get a notification when it happens — just like that. Remember: I’ll be doing all the planting, but your suggestions fuel the mission.'
    },
    {
        head: 'Caring...',
        subHead: 'Not for me... for the plants',
        img: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        actionHead: 'Help with Care',
        actionFor: 'redirect',
        scrollIndex: 0,
        redirectURL: CARING_ROUTE,
        actionBtnLabel: '🌱 Start Care',
        typeWrtrCntnt:
            'Even after planting, the real work begins — watering, protecting, adding natural fertilizer. It’s not just about growing; it’s about surviving. If you’re near a planted tree and want to help, amazing! Just please — no harm. Don’t undo what’s been done. Let’s build, not break. 💔 → 💚'
    },
    {
        head: 'Join Me',
        subHead: 'Support the green mission',
        img: 'https://images.pexels.com/photos/6317951/pexels-photo-6317951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        actionHead: 'Be a Supporter',
        actionFor: 'redirect',
        scrollIndex: 0,
        redirectURL: SUPPORT_ROUTE,
        actionBtnLabel: 'Join 🫂',
        typeWrtrCntnt:
            'Here’s the deal — I’ll keep planting no matter what. But doing this at scale takes tools, seeds, transport, and even techy stuff like cloud storage and hosting. If you believe in this mission, consider chipping in ₹10/month. Not for me — but for nature, and something that actually lasts. \n\nJoin me — not like *join me* 👀 — just in this green journey. Let’s build something beautiful together!'
    }
]
