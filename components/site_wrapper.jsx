

export default function SiteWrapper({config,children}) {
  
  return <div className="max-w-screen-lg mx-auto">
    <h1 className="text-2xl border-b-2 border-black pb-2 mb-2">{config.attributes.site_title}</h1>
    {children}
  </div>
  
}