import Card from './Card'

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
                    aaa
                </Card>
                <Card className="md:col-span-1">
                    aaa
                </Card>
            </div>

        </main>

        

    );

}