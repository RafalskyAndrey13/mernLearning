import {Link} from 'react-router-dom';

const LinksList = ({links}) => {
    return (<table>
    <thead>
      <tr>
          <th>Link</th>
          <th>Original</th>
          <th>Shorten</th>
          <th></th>
      </tr>
    </thead>

    <tbody>
      {links.map((link, index) => <tr key={index}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td><Link to={`/detail/${link._id}`}>Open</Link></td>
      </tr>)}
    </tbody>
  </table>
    )
}

export default LinksList;