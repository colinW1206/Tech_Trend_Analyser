import Card from './Card'
import Footer from './Footer'

export default function ContentContainer() {

    return(

        <main className='
            max-w-7xl mx-auto
            pt-24 px-6 pb-12

        '>

            <div className='
                grid grid-cols-1
                md:grid-cols-3 gap-6
            '>
                <Card className="md:col-span-2">
                    the tech trend of the day
                </Card>
                <Card className="md:col-span-1">
                    not sure yet, maybe something for navigation? or other info
                </Card>

                <Footer className="
                    md:col-span-3
                ">
                    aaaaa
                </Footer>
            </div>

        </main>

        

    );

}